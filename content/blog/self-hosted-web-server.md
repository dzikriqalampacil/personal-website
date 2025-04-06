---
title: "How I Built a Self-Hosted Web Server with a Beelink Mini PC"
date: "2024-03-28"
author: "Dzikri Qalam Hatorangan"
summary: "Learn the basics of web development and get started on your coding journey."
---

![When you accidentally add your credit card and your bill is going to the moon](/images/blog/soaring_cloud_bill.jpeg)

## Introduction
Cloud hosting is convenient, but over time, the costs can add up—especially if you’re running multiple projects. After renting virtual machines from cloud providers for a while, I started wondering. **What if I could host my own websites instead?**

That’s when I decided to set up a **home server using a Beelink Mini PC S12 Pro** (This is not a sponsored post, but feel free to contact me). Not only does it give me full control over my infrastructure, but it’s also a great way to learn more about server management.

## Preparing the Parts
![A glimpse of not so tidy Mini PC setup.](/images/blog/mini_pc_setup.jpg)

You can use any Mini PC you like, but for the initial setup, you’ll need a few essential components to interact with it. Going back to the basics, you’ll need at least a **monitor and a keyboard**. A mouse is also recommended, especially since most Mini PCs come with **Windows pre-installed**. I recommend borrowing these from a friend or neighbor since, later on, we’ll use **Remote Desktop Connection** to interact with the Mini PC (assuming you already have a personal computer when reading this blog post).  

In this tutorial, I’ll be guiding you from the perspective of **Windows OS**, as I’ll be using **Hyper-V** as the hypervisor to create virtual machines, where we will host our website.  

## Setting up Remote Desktop Connection (Optional)
Now if you have mini PC setup like mine, it is very uncovenient to operate with it as currently I don't have a designated spot for the Mini PC and I'm also not planning to have one. Instead, we could utilize RDC where I could access it at my bedroom where I already have laptop setup there. To enable it on your mini PC you need to follow these steps:

	1. On your Mini PC, select Start and then choose the Settings icon on the l eft.
	2. Select the System group followed by the Remote Desktop item.
	3. Use the slider to enable Remote Desktop.

Take note of the Mini PC Name as it will be used to login from the client PC. Make sure to add remote desktop users. The easiest way is to use the same email when you login to your client device and the mini pc.

## Setup Hyper-V for running virtual machines

Before you can enable Hyper-V make sure your Mini PC is compatible. To check it you can follow these steps:

	1. Press the Windows key + R to open the Run dialog box.
	2. Type msinfo32 and press Enter.
	3. In the System Information window, scroll down to the "System Summary" section and look for the Hyper-V Requirements line. If it says "Yes", then your system is compatible.

If your system is confirmed to be compatible, you can follow these steps to enable Hyper-V:

	1. Press the Windows key + R to open the Run dialog box.
	2. Type appwiz.cpl and press Enter.
	3. In the Programs and Features window, select Turn Windows features on or off in the left-hand pane.
	4. In the Windows Features window, scroll down to Hyper-V and check the box next to it
	5. Click on OK and wait for the installation process to complete.
	6. Once the installation is complete, click on Restart Now to restart your computer.

Now you want to create an External Switch so later on your virtual machines could have inbound and outbound acess to the internet. To create External Switch you can follow these steps:

	1. Open Hyper-V manager.
	2. In the right pane, click Virtual Switch Manager.
	3. Under Create Virtual Switch, select External → click Create Virtual Switch.
	4. Name the switch something like, External Switch.
	5. Select the physical network adapter, for example for me is Intel Wifi 6 AX101.
	6. Check the "Allow management operating system to share this network adapter".
	7. Click Apply, then OK.

## Spawn Ubuntu Server VM on Hyper-V

Now, Hyper-V doesn't come with Ubuntu Server ISO natively. So we need to download it from the official ubuntu website. You can download it from here https://ubuntu.com/download/server#release-notes-lts. My recommendation is to download the LTS version as it is built for production ready grade.

After you downloaded the iso, you could follow these steps to create the virtual machine:

	1. Right-click on your PC name → New → Virtual Machine
	2. Click Next through the wizard and set:
		a. Name: e.g. UbuntuServer
		b. Generation: Choose Generation 2 (modern and supports UEFI)
		c. Startup Memory: 2048MB or more (you can enable dynamic memory)
		d. Network: Connect it to the External Switch we just created
		e. Virtual Hard Disk: Create a new one (20GB+ recommended)
		f. Installation Media: Browse to the Ubuntu Server .iso file you downloaded
	3. Click on Finish and the VM will be created.

As we're using not native ISO that Hyper-V support, we need to uncheck the Enable Secure Boot in the VM setting. To do that you can do:

	1. Right click on your virtual machine -> choose Settings.
	2. On the hardware pane click on Security.
	3. Uncheck the Enable Secure Boot checkbox -> Click Apply -> Click OK

Now you can start the Virtual Machine and run through the usual procedural installation for ubuntu server.

## Set Static IP for the VM

Per default, our VM will be assigned an IP from our router DHCP. Usually, these IP has some Lease Time before it gets reassigned to a new IP. Now it is best for the VM IP to be static as if there was an incident causing the VM or the Host Machine to be dead, we can still use the same static IP as before. We also don't want the VM IP to be changed as we will use the port forwarding later on to map the request from the router to the VM.

Before you change anything, we need to know two things. Our Router IP and Router DHCP IP Pool. You could try to to run `ip route` on your vm to know your router IP. it is usually one the one that started with `default` for me it is like this `default via 192.168.100.1 dev eth0 proto static`. Then the `192.168.100.1` is your router IP address.

Now for Router DHCP IP Pool the treatment could be different, but in this tutorial I will show you how to find it from Huawei Router perspective. The things that you need to do:

	1. Open your browser and type your router IP address.
	2. It will go to the router admin page, the user and the password could be seen underneath the router device.
	3. After you go in to the router admin page, go to Advanced Configuration -> LAN Configuration -> DHCP Server Configuration
	4. You could see on the Start IP Address and End IP Address field. That is your Router DHCP IP Pool.

The steps you need to follow is like this:

	1. Go to netplan configuration folder (cd etc/netplan)
	2. Change the yaml file inside that folder, for me it is named 50-cloud-init.yaml
	3. Modify the file to look like this. Note that the IP Address should be outside of the DHCP IP Pool but still in the same subnet as the router IP.

```script
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
	4. Run `sudo netplan apply` to apply the changes
	5. Test using `ip a` and ip route` to check if the IP address and your gateway has changed.

## Run your website on the background

You could use your own personal website repository if you want. But if you don't have one, you could use use mine as it is a public respository. You could clone it from here https://github.com/dzikriqalampacil/personal-website.

Now we want our website to run continously even when we don't login to the VM. So we need some tool to achieve that. As my website is react based I will use pm2 to make my website keep running.

	1. Install npm and nodejs `sudo apt install -y nodejs npm`
	2. Install pm2 `npm install -g pm2`
	3. clone the website `git clone https://github.com/dzikriqalampacil/personal-website`
	4. cd to the cloned repository `cd personal-website`
	5. build the project first `npm run build`
	6. run the website in the background `pm2 start npm --name "personal-website" -- run start`
	7. See if the website is already running and healthy `pm2 list`

You could also try to hit it on your local computer as long it is on the same network as the mini PC. If your app is run on port 3000 then you can just open it in the browser like this `<YOUR_VM_IP_ADDRESS>:3000`. You should see the website now, great!

## Expose your Website to the Internet
We want our website to be seen by others also right? But to achieve that there are several things that you must setup.

### Buy Static Public IP from your ISP

In my case, I'm using MyRepublic for my ISP. In there you could just choose IP Public Static V4 from the Add On section. Later on, you will be contacted by the ISP team of your Public IP Address. Take note for this Public IP address as it will be used in our configuration later on.

## Port Forward from the Router to the VM

Now if you already have the public IP, we will use port forwarding so whenever you hit the request to the http://<YOUR_PUBLIC_IP>:80 it will be forwarded to http://<YOUR_VM_PRIVATE_IP>:80 so make sure the pm2 is running and the port is open for inbound request. To check it we could use `sudo ufw status` to check your VM firewall settings. If for example, your want to open your VM to accept http request then you could do `sudo ufw allow 80` then `sudo ufw reload`.

You need to follow these steps to do port forwarding from your router settings. Bear in mind this is on the perspective of my huawei router:

	1. Go to your Router Admin page like before.
	2. Go to Advanced Configuration -> Forward Rules -> IPv4 Port Mapping
	3. Click on Create button
	4. Here are some field that you need to fill:
		a. Type: User-defined
		b. Mapping name: Any name you want
		c. Internal Host: You need to fill your Virtual Machine Private IP address here
		d. Protocol: TCP
		e. Internal Port Number: The VM port (80 -- 80)
		f. External Port Number: The Router port (80 -- 80)

Now any request coming to http://<YOUR_PUBLIC_IP>:80 will be redirected to your VM.

## Setup Public Domain (Optional)

You could access the website on the internet without using public domain. But, obviously for things like personal website we want the users to remember our website names easily rather than using IP address like http://192.168.x.x.

There are many domain provider out there, but in my case I'm using Hostinger for this tutorial. To create your own domain you just go to https://www.hostinger.com/domain-name-search then type the domain you like. If it is available, then you can just buy it and the domain is yours.

After you bought the domain, one thing that you need to setup is the A record. Currently, if you access the http://www.<YOUR_DOMAIN_NAME>.com it will use the default webpage hostinger has. We need to point it to our public IP. To do that is very simple on hostinger:

	1. Login to the hostinger.
	2. Go to domains -> domain portfolio.
	3. Click Manage on your just bought domain.
	4. Navigate to DNS / Nameservers  -> Manage DNS Records
	5. To create new DNS records:
		a. Type: A
		b. Name: @
		c. Points to: <YOUR_PUBLIC_IP>
		d. TTL: How long you want this record to be valid

Now, if you go to http://www.<YOUR_DOMAIN_NAME>.com it will not render the default domain provider webpage as it will redirect it to your public domain.

## Setup Reverse Proxy using Nginx

Nginx is good for load balancing and stuff. But currenty my sole reason to use nginx is so I can serve HTTPS request with SSL certificate as we will use nginx-certbot to handle that. Now to setup nginx you need to:

	1. Install the required packages `sudo apt install nginx certbot python3-certbot-nginx -y`
	2. Create new site file on `sudo vim/etc/nginx/sites-available/<YOUR_SITE_FILE_NAME>`. This will be used to map the HTTP request that comes to your VM to your desired running app in some port in your localhost.
	
	```
	server {
	    listen 80; # listen to http request
	    server_name dzikriqalam.com www.dzikriqalam.com; # proceed if the request domain name is match
	
	    location / { # it will redirect it to here
	        proxy_pass http://127.0.0.1:3000;
	        proxy_http_version 1.1;
	        proxy_set_header Upgrade $http_upgrade;
	        proxy_set_header Connection 'upgrade';
	        proxy_set_header Host $host;
	        proxy_cache_bypass $http_upgrade;
	    }
	}
	```
	3. After you create the file in sites-available, you need to symlink it 
	
	```
	sudo ln -s /etc/nginx/sites-available/dzikri-website /etc/nginx/sites-enabled/
	sudo nginx -t
	sudo systemctl reload nginx
	``

Now the website could accept http request, if you go to http://www.<YOUR_DOMAIN_NAME>.com it will render your website, cool! But there will be some notification that it is untrusted connection because we don't have any SSL certificate. Basically, the conversation between the client and the server is not encrypted that's why the browser is mad. It is also bad for the user experience. So what do we do now is to generate SSL certificate so our website could be hit by using HTTPS protocol.

	1. Make sure the HTTPS port is open. You could open it using the Nginx Full alias.
	
	```
	sudo ufw allow 'Nginx Full'
	sudo ufw enable
	sudo ufw status
	```
	
	2. Run this command to let certbot setup the SSL certificate for you `sudo certbot --nginx -d <YOUR_DOMAIN_NAME>.com -d www.<YOUR_DOMAIN_NAME>.com`

	3. Now you would see your file in the /sites-available/ folder will be modified by certbot and it signs that your server is now accepting https request.

Great! Now you can hit https://www.<YOUR_DOMAIN_NAME>.com securely and anywhere from you local home server