# 🏨 Hostel Management System (RoomMate)

> **RoomMate** — a smart hostel management system built to simplify life for **students**, **wardens**, and the **chief warden**.



## 📖 About

RoomMate is a **full-stack web application** that streamlines hostel operations. It provides **role-based access**, smart **complaint & leave tracking**, **mess management**, and **centralized notice and feedback control**.

The project aims to make hostel administration transparent and student-friendly, while reducing workload for wardens.

---

## ✨ Features

* 🔐 **Authentication & Security**

  * Email-based authentication with **JWT**
  * OTP-based **email verification**
  * Role-specific access: **Student**, **Warden**, **Chief Warden**
  * Password recovery support

* 🛠️ **Complaint Management**

  * Students raise issues
  * Wardens can **resolve, escalate, or ignore** complaints
  * Automated **email notifications** ensure accountability

* 🏖️ **Leave Portal**

  * Students apply for leave with reason & dates
  * Warden approval triggers parent notifications
  * Return marking keeps attendance consistent

* 🍴 **Mess Management**

  * Real-time **menu updates**
  * Students can **skip meals** to prevent food wastage
  * Feedback & polls for continuous improvement

* 📊 **Chief Warden Dashboard**

  * Assign wardens to hostels
  * Create & manage notices (downloadable as **PDFs**)
  * Access student feedback for better decision-making

---

## 🛠️ Tech Stack

* **Frontend**: React.js, Redux Toolkit
* **Backend**: Node.js, Express.js
* **Database**: MongoDB
* **Authentication**: JWT, OTP with Nodemailer
* **Other**: PDF generation, email notifications

---

## 🏗️ Folder Structure

```
Hostel_Management_System/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── features/ (Redux slices)
│   │   ├── pages/
│   │   └── App.js, index.js
│
├── package.json
└── README.md
```

---

## 🚀 Setup & Installation

### Prerequisites

* Node.js (>=14)
* MongoDB (local or cloud)
* Email account (for OTP/notifications)

### Steps

1. Clone the repo

   ```bash
   git clone https://github.com/Harsh2001Ranjan/Hostel_Management_System.git
   cd Hostel_Management_System
   ```

2. Install dependencies

   ```bash
   # Backend
   cd backend
   npm install

   # Frontend
   cd ../frontend
   npm install
   ```

3. Configure `.env` in backend

   ```ini
   PORT=4000
   MONGO_URI=your_mongo_uri
   JWT_SECRET=your_secret
   EMAIL_USER=your_email
   EMAIL_PASS=your_email_password
   ```

4. Run the app

   ```bash
   # Start backend
   cd backend
   npm run dev

   # Start frontend
   cd ../frontend
   npm start
   ```

---

## 🙋 Contributing

1. Fork the repo
2. Create a new branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m "Added new feature"`)
4. Push to your branch (`git push origin feature/new-feature`)
5. Create a Pull Request

---


## 📬 Contact

**Harsh Ranjan**
📍 MNNIT Allahabad
🔗 [GitHub](https://github.com/Harsh2001Ranjan)

---

⭐ Don’t forget to **star** this repo if you found it useful!
