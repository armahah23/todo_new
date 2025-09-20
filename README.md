# 📝 Todo Application

<img width="1316" height="609" alt="image" src="https://github.com/armahah23/todo_new/blob/main/public/screen-shot.png" />

---

# 🚀 Overview

This is a modern Todo application built using React and Tailwind CSS, designed to help users manage their daily tasks efficiently.

The app is fully deployed on an AWS EC2 instance, so it’s live and accessible from anywhere!

Key features:

Create, update, and delete tasks

Mark tasks as completed

Responsive UI with Tailwind CSS

Single Page Application (SPA) behavior

---

## 🌐 Live Demo

You can access the live application here:
[http://13.54.121.92/](http://13.54.121.92/)


## 🛠️ Technology Stack
| Layer           | Technology/Tool     |
| --------------- | ------------------- |
| Frontend        | React, Tailwind CSS |
| Deployment      | AWS EC2, Nginx      |
| Build Tool      | Vite                |
| Version Control | Git + GitHub        |



## 📌 Features

Add Tasks: Quickly add a new task with a single click.

Edit Tasks: Update task descriptions.

Delete Tasks: Remove completed or unnecessary tasks.

Mark Complete: Toggle task completion status.

Responsive Design: Works perfectly on mobile, tablet, and desktop.

---

## 💻 Local Setup

To run the project locally, follow these steps:

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/todo-app.git
cd todo-app 
```

### 2. Install dependencies
```bash
 npm install
```

### 3. Run the development server
```bash
npm run dev
```

### 4. Build for production
```bash
npm run build
```

The dist/ folder will be generated for deployment.

## ☁️ Deployment on EC2

This app is hosted on an AWS EC2 Ubuntu instance using Nginx.
Here’s a brief overview of how it’s deployed:

React app built using npm run build → generates dist/ folder.

dist/ folder copied to EC2 using scp or rsync.

Files moved to /var/www/html (Nginx root folder).

Nginx configured with try_files $uri /index.html for SPA routing.

Nginx restarted and app is now live at [http://13.54.121.92/](http://13.54.121.92/)

This deployment demonstrates real-world skills in cloud hosting, server configuration, and static site deployment.

---

## 🖌️ Styling

Built with Tailwind CSS for a clean, responsive, and modern UI.

Minimalist design focused on usability and efficiency.

## 🔗 Future Enhancements

Add user authentication with JWT

Save tasks to a database for persistence

Enable HTTPS with a custom domain and SSL

Add filtering and search features for tasks

---

## 👨‍💻 Author

Afrih Rafeek

Full Stack Developer | Cloud Enthusiast

LinkedIn: [Your LinkedIn URL](www.linkedin.com/in/arm-afrih)

GitHub: [Your GitHub URL](https://github.com/armahah23)

## ⭐ Why This Project is Special

This project not only shows your frontend skills with React and Tailwind, but also highlights real-world cloud deployment experience using AWS EC2 and Nginx, making it an excellent portfolio project to share with recruiters and developers alike.
