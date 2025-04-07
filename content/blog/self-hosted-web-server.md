---
title: "How I Built a Self-Hosted Web Server with a Beelink Mini PC Using Hyper-V"
date: "2024-03-28"
author: "Dzikri Qalam Hatorangan"
summary: "How I set up a personal web server on a Beelink Mini PC with Hyper-V to deploy and expose my frontend website to the internet."
---

![When you accidentally add your credit card and your bill is going to the moon](/images/blog/soaring_cloud_bill.jpeg)

## Introduction

Cloud hosting is convenient, but over time, the costs can add up—especially if you’re running multiple projects. After renting virtual machines from cloud providers for a while, I started wondering. **What if I could host my own websites instead?**

That’s when I decided to set up a **home server using a Beelink Mini PC S12 Pro** (This is not a sponsored post, but feel free to contact me). Not only does it give me full control over my infrastructure, but it’s also a great way to learn more about server management.

## Preparing the Parts

![A glimpse of not so tidy Mini PC setup](/images/blog/mini_pc_setup.jpg)

You can use any Mini PC you like, but for the initial setup, you’ll need a few essential components to interact with it. Going back to the basics, you’ll need at least a **monitor and a keyboard**. A mouse is also recommended, especially since most Mini PCs come with **Windows pre-installed**. I recommend borrowing these from a friend or neighbor since, later on, we’ll use **Remote Desktop Connection** to interact with the Mini PC (assuming you already have a personal computer when reading this blog post).  

In this tutorial, I’ll be guiding you from the perspective of **Windows OS**, as I’ll be using **Hyper-V** as the hypervisor to create virtual machines, where we will host our website.  

## Setting Up Remote Desktop Connection (Optional)

Now if you have a mini PC setup like mine, it is very inconvenient to operate with it as currently I don't have a designated spot for the Mini PC and I'm also not planning to have one. Instead of plugging in a separate monitor, keyboard, and mouse, I prefer to use **Remote Desktop Connection (RDC)** to access the Mini PC directly from my laptop, which is already set up in my bedroom.

To enable Remote Desktop on your Mini PC:

1. Click **Start**, then select the **Settings** icon.
2. Go to **System**, then scroll down and click on **Remote Desktop**.
3. Toggle the switch to **Enable Remote Desktop**.

![Enable RDP Connection](/images/blog/rdp.png)

Once it's enabled, make a note of your **Mini PC's name**—you’ll need it later when connecting from another device.

Also, make sure your user account has permission to connect remotely. The easiest way is to sign in with the **same Microsoft account** on both your Mini PC and the laptop you'll be using to access it.


## Setting Up Hyper-V to Run Virtual Machines

Before enabling Hyper-V, you’ll need to make sure your Mini PC supports it. Here’s how to check:

1. Press **Windows + R** to open the Run dialog.
2. Type `msinfo32` and hit Enter.
3. In the System Information window, scroll down under **System Summary** and look for **Hyper-V Requirements**. If all values show **Yes**, you're good to go!

### Enabling Hyper-V

Once you've confirmed compatibility, follow these steps to turn on Hyper-V:

1. Press **Windows + R**, type `appwiz.cpl`, and press Enter.
2. In the **Programs and Features** window, click **Turn Windows features on or off** on the left.
3. Scroll down, find **Hyper-V**, and check the box.
4. Click **OK**, then wait for the installation to finish.
5. When prompted, restart your PC.

### Creating an External Switch for Internet Access

Before spinning up a VM, you’ll want to create an **External Switch**—this allows your virtual machines to access the internet and your local network. Here's how:

1. Open **Hyper-V Manager**.
2. On the right-hand side, click **Virtual Switch Manager**.
3. Under **Create Virtual Switch**, choose **External** and click **Create Virtual Switch**.
4. Give it a name like `External Switch` for clarity.
5. Choose your physical network adapter (in my case, it was `Intel Wi-Fi 6 AX101`).
6. Make sure **Allow management operating system to share this network adapter** is checked.
7. Click **Apply**, then **OK**.

![External Switch Setting](/images/blog/external_switch.png)

## Spawning an Ubuntu Server VM on Hyper-V

Hyper-V doesn’t include Ubuntu Server out of the box, so we’ll need to download the ISO manually. Head over to the [official Ubuntu website](https://ubuntu.com/download/server#release-notes-lts) and download the **LTS version**—it’s built for long-term support and is more stable for production use.

### Creating the Virtual Machine

Once the ISO is downloaded, follow these steps to create your Ubuntu Server VM:

1. In **Hyper-V Manager**, right-click your PC name → **New** → **Virtual Machine**.
2. Walk through the wizard and configure the following:

    - **Name**: e.g. `UbuntuServer`
    - **Generation**: Choose **Generation 2** (modern, UEFI support)
    - **Startup Memory**: At least **2048MB** (you can enable dynamic memory)
    - **Network**: Attach it to the **External Switch** you created earlier
    - **Virtual Hard Disk**: Create a new one (recommend at least **20GB**)
    - **Installation Media**: Select the Ubuntu Server `.iso` you downloaded

3. Click **Finish** to create the VM.

![New VM Wizard](/images/blog/new_vm.png)

### Disabling Secure Boot

Since we’re using an ISO that Hyper-V doesn’t officially support, we need to disable **Secure Boot** for the VM:

1. Right-click your newly created VM → **Settings**.
2. Under **Hardware**, select **Security**.
3. Uncheck **Enable Secure Boot**, then click **Apply** and **OK**.

You can now start the virtual machine and go through the standard Ubuntu Server installation process.

## Setting a Static IP for the VM

By default, your VM will receive a dynamic IP address from your router's DHCP server. These IPs can change over time due to lease expiration, which can cause issues—especially if you're planning to use **port forwarding** or want reliable remote access. Setting a **static IP** ensures your VM always uses the same address, even after restarts or outages.

### Step 1: Identify Router IP and DHCP IP Pool

Before configuring a static IP, you’ll need two things:

1. **Your Router’s IP Address**  
   On your VM, run:

   ```bash
   ip route
   ```

   Look for a line starting with `default`. For example:

   ```
   default via 192.168.100.1 dev eth0 proto static
   ```

   Here, `192.168.100.1` is your router's IP address.

2. **Your Router’s DHCP IP Pool**  
   This can vary by router, but here's how to find it on a Huawei router:

   1. Open your browser and enter your router's IP address.
   2. Log in using the credentials (usually printed on the router).
   3. Navigate to **Advanced Configuration → LAN Configuration → DHCP Server Configuration**.
   4. Look for the **Start IP Address** and **End IP Address** fields—this is your DHCP IP range.

![Router DHCP Page](/images/blog/router_dhcp.png)

### Step 2: Configure Static IP with Netplan

1. SSH into your Ubuntu VM or access its terminal.
2. Navigate to the Netplan configuration folder:

   ```bash
   cd /etc/netplan
   ```

3. Open the YAML config file (usually named `50-cloud-init.yaml`) in a text editor.
4. Modify it to something like the following, replacing `<YOUR_DESIRED_IP_ADDRESS>` and `<YOUR_ROUTER_IP_ADDRESS>` with values **outside the DHCP pool** but still within the same subnet:

   ```yaml
   network:
     ethernets:
       eth0:
         addresses:
           - <YOUR_DESIRED_IP_ADDRESS>/24
         gateway4: <YOUR_ROUTER_IP_ADDRESS>
         nameservers:
           addresses:
             - 8.8.8.8
             - 8.8.4.4
         dhcp4: no
     version: 2
     renderer: networkd
   ```

5. Apply the changes:

   ```bash
   sudo netplan apply
   ```

6. Verify the changes:

   ```bash
   ip a
   ip route
   ```

Confirm that your new static IP and correct gateway are now in use.


## Running Your Website in the Background

You’re free to use your own website project for this step, but if you don’t have one handy, feel free to use mine—it’s open source and available here: [https://github.com/dzikriqalampacil/personal-website](https://github.com/dzikriqalampacil/personal-website)

Since we want the website to **keep running in the background**, even after we log out of the VM, we’ll use a tool called `pm2`. It’s great for managing Node.js apps, and since this site is built with React, it’s a perfect fit.

### Steps to Get It Running:

1. Install Node.js and npm:

   ```bash
   sudo apt install -y nodejs npm
   ```

2. Install `pm2` globally:

   ```bash
   npm install -g pm2
   ```

3. Clone the website repo:

   ```bash
   git clone https://github.com/dzikriqalampacil/personal-website
   ```

4. Navigate to the project folder:

   ```bash
   cd personal-website
   ```

5. Build the project:

   ```bash
   npm run build
   ```

6. Start the website in the background with `pm2`:

   ```bash
   pm2 start npm --name "personal-website" -- run start
   ```

7. Check if the app is running properly:

   ```bash
   pm2 list
   ```
	
	It should output something like this:

	```bash
	dzikri@dzikri:~$ pm2 list
	┌────┬────────────────────┬──────────┬──────┬───────────┬──────────┬──────────┐
	│ id │ name               │ mode     │ ↺    │ status    │ cpu      │ memory   │
	├────┼────────────────────┼──────────┼──────┼───────────┼──────────┼──────────┤
	│ 0  │ nextjs-app         │ fork     │ 0    │ online    │ 0%       │ 76.4mb   │
	└────┴────────────────────┴──────────┴──────┴───────────┴──────────┴──────────┘
	```

Now, try opening the site from another device on the same network. If your VM IP address is `192.168.100.100` and the app is running on port `3000`, you can access it in your browser like this:

```
http://192.168.100.100:3000
```

You should see the website up and running—nice work!

## Expose Your Website to the Internet

We want our website to be publicly accessible, right? To make that happen, there are a few things we need to set up.

### Buy a Static Public IP from Your ISP

In my case, I'm using **MyRepublic** as my ISP. They offer an **IP Public Static V4** option under their Add-On section. Once you purchase it, you’ll be contacted by their support team and provided with your **static public IP address**.

Make sure to **note this IP**, as you’ll use it in your port forwarding configuration.

![MyRepublic IPv4 Public Static IP Page](/images/blog/my_republic.png)

### Set Up Port Forwarding from Your Router to the VM

Now that you have your static public IP, the next step is to **forward incoming traffic to your VM**. This way, when someone accesses `http://<YOUR_PUBLIC_IP>:80`, the router will forward that request to `http://<YOUR_VM_PRIVATE_IP>:80`.

Before setting this up, make sure:

- Your website is running in the background via `pm2`.
- Port `80` is open on your VM to accept inbound traffic.

You can check and allow the port using `ufw` (Uncomplicated Firewall):

```bash
sudo ufw status          # Check if port 80 is already allowed
sudo ufw allow 80        # Allow incoming traffic on port 80 (HTTP)
sudo ufw reload          # Reload firewall settings
```

### Configure Port Forwarding (Huawei Router Example)

Here’s how to configure port forwarding on a **Huawei router** (steps may differ slightly for other routers):

1. Open your browser and go to your router’s admin page (e.g., `http://192.168.100.1`)
2. Log in using the credentials found on the label under the router.
3. Go to: `Advanced Configuration → Forward Rules → IPv4 Port Mapping`
4. Click the **Create** button.
5. Fill in the following fields:

   - **Type**: `User-defined`  
   - **Mapping Name**: (Any name you like, e.g., `web-server`)  
   - **Internal Host**: Your VM’s internal IP address (e.g., `192.168.100.99`)  
   - **Protocol**: `TCP`  
   - **Internal Port Number**: `80` to `80`  
   - **External Port Number**: `80` to `80`  

![Huawei Port Forward Configuration](/images/blog/router_port_forward.png)

Now, any HTTP request sent to:

```
http://<YOUR_PUBLIC_IP>
```

will be forwarded directly to your VM, and your website will be accessible from the internet. Cool!

## Set Up a Public Domain (Optional)

Sure, you can access your website over the internet using just the public IP address. But let’s be honest—`http://192.168.x.x` isn’t exactly easy to remember or share. For a personal or professional website, using a custom domain name makes a huge difference in terms of branding and accessibility.

### Buy a Domain

There are many domain providers out there. For this tutorial, I’m using **Hostinger**.

1. Head over to [https://www.hostinger.com/domain-name-search](https://www.hostinger.com/domain-name-search)
2. Type in the domain name you want.
3. If it’s available, purchase it—and just like that, it’s yours.

### Set Up an A Record

By default, if you go to `http://www.<YOUR_DOMAIN_NAME>.com`, it’ll probably show a generic Hostinger landing page. That’s because the DNS isn’t yet pointing to your server. To change that, you need to configure an **A record**.

Follow these steps on Hostinger:

1. Log in to your [Hostinger account](https://www.hostinger.com).
2. Go to `Domains → Domain Portfolio`.
3. Click **Manage** on the domain you just purchased.
4. Navigate to `DNS / Nameservers → Manage DNS Records`.
5. Create a new DNS record with the following fields:
   - **Type**: `A`
   - **Name**: `@`
   - **Points to**: `<YOUR_PUBLIC_IP>` (the static IP you bought from your ISP)
   - **TTL**: How long the record should be cached (default is usually fine)

Once this is set up and propagated (can take a few minutes to a few hours), your domain `http://www.<YOUR_DOMAIN_NAME>.com` will now point to your home server and no longer show the default Hostinger landing page. Clean and professional!

![Managing Domain in Hostinger](/images/blog/hostinger_domain_page.png)

## Set Up Reverse Proxy Using Nginx

We’re going to use **Nginx** primarily to enable HTTPS on our website using a free SSL certificate from Let's Encrypt via **Certbot**. While Nginx is great for load balancing and performance tuning, in this case, we're just using it as a reverse proxy to route traffic and handle HTTPS.

### 1. Install Required Packages

```bash
sudo apt update
sudo apt install nginx certbot python3-certbot-nginx -y
```

### 2. Create a New Site Configuration

Navigate to the Nginx site configuration directory and create a new file:

```bash
sudo vim /etc/nginx/sites-available/<YOUR_SITE_FILE_NAME>
```

Paste the following configuration (update the `server_name` and `proxy_pass` port to match your setup):

```nginx
server {
    listen 80;
    server_name dzikriqalam.com www.dzikriqalam.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 3. Enable the Configuration

Now, link your config to the `sites-enabled` directory and reload Nginx:

```bash
sudo ln -s /etc/nginx/sites-available/<YOUR_SITE_FILE_NAME> /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

Your site is now accessible via `http://www.<YOUR_DOMAIN_NAME>.com`, but browsers will still complain about an **untrusted connection**. That’s because there’s no SSL certificate yet, and HTTP is unencrypted.

## Enable HTTPS with SSL Certificate

### 1. Open Port 443 for HTTPS

Make sure your firewall allows HTTPS traffic. You can use UFW’s predefined profile for this:

```bash
sudo ufw allow 'Nginx Full'
sudo ufw enable
sudo ufw status
```

### 2. Run Certbot

This will obtain and configure the SSL certificate automatically:

```bash
sudo certbot --nginx -d <YOUR_DOMAIN_NAME>.com -d www.<YOUR_DOMAIN_NAME>.com
```

Certbot will update your Nginx config automatically and reload the server.

✅ That’s it! You can now securely access your site from anywhere via:

```
https://www.<YOUR_DOMAIN_NAME>.com
```

All traffic will be encrypted, and the browser will show that reassuring little padlock icon. Clean, secure, and professional!

## Conclusion

You’ve now set up your mini PC to host a website that’s accessible from anywhere. Starting from running the app in the background with **PM2**, assigning a *static IP*, setting up *port forwarding*, connecting a *public domain*, and securing it with **HTTPS** using *Nginx* and *Certbot*.

This setup gives you full control over your deployment and is a solid foundation for future self-hosted projects. A simple, cost-effective way to bring your personal site online using your own hardware.

*Feel free to DM me if you have any questions or need help along the way 🙂*


