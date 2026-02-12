# Bell Listener - Run this on your Windows host machine
# Plays bell.mp3 + person.mp3 twice when triggered
#
# Setup: Place your sound files at C:\bell\bell.mp3 and C:\bell\person.mp3
#        Or change the paths below

$port = 9999
$bellFile = "C:\bell\bell.mp3"
$personFile = "C:\bell\person.mp3"

Add-Type -AssemblyName PresentationCore

$player = New-Object System.Windows.Media.MediaPlayer

function PlayAndWait($path) {
    $player.Open([Uri]::new($path))
    # Wait until media is loaded and duration is available
    $timeout = 0
    while (-not $player.NaturalDuration.HasTimeSpan -and $timeout -lt 50) {
        Start-Sleep -Milliseconds 100
        $timeout++
    }
    $player.Volume = 1.0
    $player.Play()
    if ($player.NaturalDuration.HasTimeSpan) {
        Start-Sleep -Milliseconds ($player.NaturalDuration.TimeSpan.TotalMilliseconds + 100)
    } else {
        Start-Sleep -Milliseconds 2000
    }
    $player.Stop()
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://+:$port/")

try {
    $listener.Start()
    Write-Host "Bell listener started on port $port" -ForegroundColor Green
    Write-Host "Bell sound: $bellFile" -ForegroundColor Gray
    Write-Host "Person sound: $personFile" -ForegroundColor Gray
    Write-Host "Waiting for bell rings..." -ForegroundColor Gray

    while ($true) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        if ($request.HttpMethod -eq "POST" -and $request.Url.AbsolutePath -eq "/ring") {
            # Respond immediately so the API doesn't time out
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

        # Play sounds after responding
        if ($request.HttpMethod -eq "POST" -and $request.Url.AbsolutePath -eq "/ring") {
            Write-Host "[$(Get-Date -Format 'HH:mm:ss')] DING DONG!" -ForegroundColor Yellow
            for ($i = 0; $i -lt 2; $i++) {
                for ($j = 0; $j -lt 3; $j++) {
                    PlayAndWait $bellFile
                }
                PlayAndWait $personFile
            }
        }
    }
}
finally {
    $player.Close()
    $listener.Stop()
}
