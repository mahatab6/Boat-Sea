# 🚤 Boat Sea – Full Stack Boat Booking Platform

Boat Sea is a **full‑stack boat booking web application** where **boat owners can list their boats**, **customers can book trips**, and **admins manage the entire system** through a centralized dashboard.

This project is built using a modern **Next.js + Express + Prisma + PostgreSQL + Stripe** stack and follows production‑level architecture practices.

---

# 🌐 Live Links

### Frontend

[https://boat-sea.vercel.app/](https://boat-sea.vercel.app/)

### Backend API

[https://boat-backend-indol.vercel.app/](https://boat-backend-indol.vercel.app/)

### Frontend Repository

[https://github.com/mahatab6/Boat-Sea](https://github.com/mahatab6/Boat-Sea)

### Backend Repository

[https://github.com/mahatab6/Boat-Sea-Backend](https://github.com/mahatab6/Boat-Sea-Backend)

---

# 📌 Project Overview

Boat Sea allows three main user roles:

### 👤 Customer

- Register/Login securely
- Browse available boats
- View boat details
- Select travel schedule
- Book boats
- Make secure payments
- Manage bookings

### 🚤 Boat Owner

- Add boats
- Update boat details
- Upload boat images
- Set pricing
- Track bookings

### 🛠️ Admin

- Manage users
- Manage boats
- Monitor bookings
- Control platform data
- Manage approval workflows

---

# 🧱 Tech Stack

## Frontend

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- ShadCN UI
- TanStack Query
- TanStack Table
- TanStack Form
- Axios
- Zod Validation
- Framer Motion Animations
- GSAP Animations
- React Icons
- Swiper Slider
- Lottie Animations
- Recharts
- Next Themes
- Sonner Toast

---

## Backend

- Express.js v5
- TypeScript
- Prisma ORM
- PostgreSQL (Neon DB)
- Better Auth
- JWT Authentication
- Stripe Payment Integration
- Cloudinary File Upload
- Nodemailer Email Service
- PDFKit Invoice Generator
- Multer File Upload
- Zod Validation
- Resend Email API

---

# 🔐 Authentication Features

- Email & Password Login
- Secure JWT Token System
- Cookie-based authentication
- Role-based access control

---

# 💳 Payment System

Integrated with **Stripe**:

Features:

- Secure checkout session
- Booking payment flow
- Payment verification
- Webhook support
- Invoice generation (PDF)

---

# 📦 Core Application Features

### Boat Management

- Add boat
- Update boat
- Delete boat
- Upload boat images
- Availability status tracking

### Booking System

- Select schedule
- Choose travel date
- Real-time booking flow
- Payment integration
- Booking history tracking

### Dashboard System

Role-based dashboards:

- Admin Dashboard
- Owner Dashboard
- Customer Dashboard

Each dashboard provides controlled access based on permissions.

# 🧪 Environment Variables

## Frontend (.env.local)

```
follow env example
```

## Backend (.env)

```
follow env example
```

---

# ⚙️ Installation Guide

## Clone Frontend

```
git clone https://github.com/mahatab6/Boat-Sea.git
cd Boat-Sea
npm install
npm run dev
```

## Clone Backend

```
git clone https://github.com/mahatab6/Boat-Sea-Backend.git
cd Boat-Sea-Backend
npm install
npx prisma generate
npx prisma db push
npm run dev
```

---

# 📊 Database Design

Database built using **Prisma ORM** with PostgreSQL.

Core entities:

- User
- Boat
- Booking
- Payment
- Schedule
- Role

Designed with scalable relational architecture.

---

# ☁️ Deployment

Frontend deployed on:

Vercel

Backend deployed on:

Vercel Serverless Functions

Database hosted on:

Neon PostgreSQL

Media storage:

Cloudinary

---

# 🚀 Future Improvements

Planned upgrades:

- Notification system
- Real-time booking updates
- Chat between owner & customer
- Advanced analytics dashboard
- Mobile app version

---

# 👨‍💻 Author

MahAtab

Full Stack Developer (MERN + Next.js)

GitHub:

[https://github.com/mahatab6](https://github.com/mahatab6)
