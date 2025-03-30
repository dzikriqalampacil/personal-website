export const blogPosts = [
  {
    id: 1,
    title: "How I Built a Self-Hosted Web Server with a Beelink Mini PC",
    content: `
![When you accidentally add your credit card and your bill is going to the moon.](/images/blog/soaring_cloud_bill.jpeg)

## Introduction
Cloud hosting is convenient, but over time, the costs can add up—especially if you’re running multiple projects. After renting virtual machines from cloud providers for a while, I started wondering. **What if I could host my own websites instead?**

That’s when I decided to set up a **home server using a Beelink Mini PC S12 Pro** (This is not a sponsored post, but feel free to contact me). Not only does it give me full control over my infrastructure, but it’s also a great way to learn more about server management.

## Preparing the Parts
![A glimpse of not so tidy Mini PC setup](/images/blog/mini_pc_setup.jpg)

You can use any Mini PC you like, but for the initial setup, you’ll need a few essential components to interact with it. Going back to the basics, you’ll need at least a **monitor and a keyboard**. A mouse is also recommended, especially since most Mini PCs come with **Windows pre-installed**. I recommend borrowing these from a friend or neighbor since, later on, we’ll use **Remote Desktop Connection** to interact with the Mini PC (assuming you already have a personal computer when reading this blog post).  

In this tutorial, I’ll be guiding you from the perspective of **Windows OS**, as I’ll be using **Hyper-V** as the hypervisor to create virtual machines, where we will host our website.  

`,
    date: "2024-03-28",
    author: "Dzikri Qalam Hatorangan",
    slug: "getting-started-with-web-development",
    summary:
      "Learn the basics of web development and get started on your coding journey.",
  },
];
