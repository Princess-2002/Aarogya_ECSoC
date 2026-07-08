# 🩺 Aarogya – AI-Powered Healthcare Companion

**Aarogya** is a web-based healthcare platform. It empowers users with smart, AI-integrated services like symptom checking, appointment booking, health report analysis, and an intuitive dashboard experience for patients and doctors.

---

## 🎯 Problem Statement

Modern healthcare systems often lack immediate AI-powered diagnosis support, accessible doctor-patient interaction, and efficient appointment handling. Aarogya aims to bridge this gap by offering a smart, intuitive platform for both patients and doctors.

---

## 🚀 Features

- 🔐 **Secure Login & Signup** – Role-based login for Doctors and Patients
- 👩‍⚕️ **Doctor Listings** – Patients can browse available doctors and book appointments
- 📅 **Appointment Scheduling** – Live appointment tracking and management
- 💬 **AI Health Chatbot** – Simulated conversational AI assistant for health-related queries
- 📄 **Health Report Analysis** – Upload a report and receive AI-generated analysis (prototype)
- 🧑‍⚕️ **Doctor Dashboard** – View appointments and accept/reject bookings
- 🧑‍💻 **Patient Dashboard** – Track booked appointments and view recent activity
- 📞 **Contact Form** – Message the team directly from the platform

---

## 🧠 AI Integration

> _"Integrating AI to make healthcare more responsive, personalized, and accessible."_

- 🤖 **Chatbot & Report Analysis** simulate GPT-based interaction using pre-defined responses

---

## 🏗️ Tech Stack

| Layer        | Tech Used                          |
|--------------|------------------------------------|
| Frontend     | HTML, CSS, JavaScript, EJS         |
| Backend      | Node.js, Express.js                |
| Database     | MongoDB Atlas                      |
| Authentication | JWT & Cookies                   |
| AI Integration | OpenAI API |
| Hosting      | Render.com                         |

---

## 🛠️ Installation & Local Setup

```bash

# Clone the repo
git clone https://github.com/pranav-gujar/HealthLink.git
cd HealthLink

# Install dependencies
npm install

# Add your environment variables
touch .env

# Start the server
node server.js

# Visit
http://localhost:5000

```
---

## 🙏 Thanks 

> _"Let's build tech that heals, helps, and uplifts humanity."_

- Regards,
- Shraddha Sherekar
---

### 🚀 Complete Setup Guide

To get Aarogya up and running on your local machine, follow these detailed steps:

#### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB)
- npm or yarn package manager

#### Step 1: Clone the Repository
```bash
git clone https://github.com/pranav-gujar/HealthLink.git
cd HealthLink
```

#### Step 2: Install Dependencies
```bash
npm install
```

#### Step 3: Environment Configuration
Create a `.env` file in the root directory with the following variables:
```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
OPENAI_API_KEY=your_openai_api_key
NODE_ENV=development
```

#### Step 4: Database Setup
1. Create a MongoDB Atlas cluster
2. Get your connection string
3. Add it to the `.env` file as `MONGODB_URI`

#### Step 5: Run the Application
```bash
# Development mode
npm run dev

# Production mode
npm start
```

#### Step 6: Access the Application
Open your browser and navigate to:
```
http://localhost:5000
```

#### Default Test Credentials
**Patient Login:**
- Email: patient@test.com
- Password: patient123

**Doctor Login:**
- Email: doctor@test.com
- Password: doctor123

#### Troubleshooting
- If you encounter MongoDB connection issues, check your IP whitelist in Atlas
- For OpenAI API errors, verify your API key has sufficient credits
- Port conflicts can be resolved by changing the PORT variable in `.env`

---

### 📁 Project Structure

```
Aarogya/
├── public/
│   ├── css/
│   ├── js/
│   └── images/
├── views/
│   ├── partials/
│   ├── pages/
│   └── layouts/
├── routes/
├── models/
├── controllers/
├── middleware/
├── config/
├── utils/
├── .env
├── package.json
└── server.js
```

---

### 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

### 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

### 📞 Support

For support, email shraddha.sherekar@email.com or create an issue in the GitHub repository.

---

> _"Let's build tech that heals, helps, and uplifts humanity."_

- Regards,
- Shraddha Sherekar
