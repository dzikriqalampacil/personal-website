# Bell Listener - Run this on your Windows host machine
# Listens for HTTP POST requests from the Ubuntu VM and plays a beep sound
#
# Usage: powershell -ExecutionPolicy Bypass -File bell-listener.ps1
# To run at startup: add a shortcut to shell:startup pointing to this script

$port = 9999
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://+:$port/")

try {
    $listener.Start()
    Write-Host "Bell listener started on port $port" -ForegroundColor Green
    Write-Host "Waiting for bell rings..." -ForegroundColor Gray

    while ($true) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        if ($request.HttpMethod -eq "POST" -and $request.Url.AbsolutePath -eq "/ring") {
            Write-Host "[$(Get-Date -Format 'HH:mm:ss')] DING DONG!" -ForegroundColor Yellow
            [Console]::Beep(800, 500)
            $response.StatusCode = 200
            $body = [System.Text.Encoding]::UTF8.GetBytes('{"ok":true}')
        }
        else {
            $response.StatusCode = 404
            $body = [System.Text.Encoding]::UTF8.GetBytes('{"error":"not found"}')
        }

        $response.ContentType = "application/json"
        $response.ContentLength64 = $body.Length
        $response.OutputStream.Write($body, 0, $body.Length)
        $response.Close()
    }
}
finally {
    $listener.Stop()
    Write-Host "Bell listener stopped." -ForegroundColor Red
}
