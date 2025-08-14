# 🏥 Medical Camp Management System (MCMS)

A full-stack MERN project that allows **Organizers** to manage medical camps and **Participants** to register, pay, and give feedback efficiently. Developed as part of **Assignment 12 - Category 013**.

## 🔗 Live Site
👉 [Visit the Live Website](https://medical-camp-ee67c.web.app/)

---

## 🔑 Organizer Credentials

- ✉️ Email: am@mu.com  
- 🔒 Password: 223344mj

---

## 🚀 Features

1. 🔐 Authentication system using Firebase & JWT with social login support (Google).
2. 🧑 Role-based dashboard for Organizers and Participants.
3. 🗂️ Organizers can add, update, and delete medical camps.
4. 👥 Participants can register for camps, pay via Stripe, and submit feedback.
5. 📊 Chart analytics using Recharts for participants.
6. 📥 Feedback & ratings system shown on the homepage.
7. 🔎 Search, sort, and layout toggle on Available Camps page.
8. 📄 Modal-based registration form with validation (React Hook Form).
9. 📦 CRUD operations with real-time UI updates and toast notifications (SweetAlert2).
10. 📱 Fully responsive design for mobile, tablet, and desktop.

---

## 💻 Technologies Used

### Client
- React.js
- React Router
- React Hook Form
- Firebase Authentication
- TanStack Query (React Query)
- Recharts
- Stripe Payment Integration
- SweetAlert2 / React Toastify
- Tailwind CSS + ShadCN/UI
- AOS / Framer Motion (Optional)
- JWT Authentication via Axios Interceptor

### Server
- Node.js
- Express.js
- MongoDB
- CORS, Dotenv, JWT, Stripe

---

## 📁 Client Side Repository
👉 [GitHub - Client](https://github.com/Programming-Hero-Web-Course4/b11a12-client-side-Mj-Marjan)

## 📁 Server Side Repository
👉 [GitHub - Server](https://github.com/Programming-Hero-Web-Course4/b11a12-server-side-Mj-Marjan)

---

## 🧭 Navigation Overview

### Public Pages:
- `/` → Homepage with banner, featured camps, feedback section
- `/available-camps` → All camp listings with search/sort/layout switch
- `/camp-details/:campId` → Detailed view with registration modal
- `/join-us` & `/register` → Login/Registration with social login

### Organizer Dashboard:
- `/dashboard/organizer-profile`
- `/dashboard/add-a-camp`
- `/dashboard/manage-camps`
- `/dashboard/manage-registered-camps`

### Participant Dashboard:
- `/dashboard/participant-profile`
- `/dashboard/registered-camps`
- `/dashboard/payment-history`
- `/dashboard/analytics`

---

## ✅ Extra Features Implemented

- Pagination and Search for all tables (10 rows per page).
- JWT-based secure routes with local storage token.
- Real-time participant count updates per camp.
- SweetAlert2 used in all major operations (no browser alerts).
- Optional: AOS animation added.

---

## 🧪 Testing Accounts

You may test both Organizer and Participant roles using appropriate login credentials. The site is configured to automatically redirect and handle role selection after login.

---

## 📄 Note to Examiner

- Email verification, password reset features have been **intentionally skipped** for convenience.
- All private routes are protected via **JWT**.
- Firebase config and MongoDB credentials are securely handled via `.env`.

---

> 📢 Thank you for reviewing this project. Feel free to explore the code and try out the functionality!
