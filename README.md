# Focus Tracker ## 📖 Project Overview Focus Tracker is a productivity web application built with **React + Vite**. It helps users track focus sessions, view history, and analyze productivity trends. Authentication and data storage are powered by **Firebase**, and the app is deployed on **Vercel**. --- ## 🚀 Features - 🔑 **Authentication**: Sign up with email and password using Firebase Authentication. - 🔐 Login page for existing users. - 📊 Dashboard to manage activities. - 📜 History page to review past sessions. - 📈 Analytics page with charts and insights. - ⚡ Built with React, Vite, and Tailwind CSS. - ☁️ Firebase integration for authentication and database. - 🌐 Deployed on Vercel. --- ## 🛠️ Tech Stack - **Frontend**: React, Vite, Tailwind CSS - **Routing**: React Router - **Authentication & Database**: Firebase (Auth + Firestore) - **Deployment**: Vercel - **Analytics**: Custom logic for session tracking and visualization - **Optional Visualization**: Three.js (for mapping/3D visualization if implemented)

🗂️ Data Model / Schema
Firestore collections:

Users

uid: string

email: string

createdAt: timestamp

Sessions

userId: string (reference to Users)

activity: string

duration: number (minutes)

date: timestamp

📊 Analytics Logic
Track each focus session with duration and activity type.

Aggregate sessions by day/week/month.

Generate insights:

Total focus time.

Most frequent activity.

Productivity trends over time


📌 Assumptions & Decisions
Authentication is email/password only (no social login).

Firebase chosen for simplicity and scalability.

Vercel used for fast deployment and CI/CD integration.

Data model kept minimal for clarity and extensibility.

Analytics logic focuses on time-tracking and trends, not deep AI/ML.

Three.js integration optional, depending on project scope.

🌍 Usage
Open the app in your browser.

Enter your email and password to sign up (Firebase Authentication).

After signing up, log in to access the dashboard.

Track your focus sessions, view history, and analyze productivity.
