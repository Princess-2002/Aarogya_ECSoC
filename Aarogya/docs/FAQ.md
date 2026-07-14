❓ Aarogya - Frequently Asked Questions (FAQ)

📋 Introduction

Welcome to the Aarogya FAQ section! This comprehensive guide answers common questions about setup, development, and troubleshooting to help you contribute effectively.



🏁 Initial Setup

Q1: What prerequisites are needed to run Aarogya?

A: Make sure you have:



Requirement	Minimum Version

Node.js	v18.x

npm	v9.x

MongoDB Atlas Account	Free tier (M0)

Git	Any version

Modern Browser	Chrome/Firefox/Edge v90+

Q2: How do I clone and install the project?

A: Follow this quick setup:



bash

\# Clone the repository

git clone https://github.com/Princess-2002/Aarogya.git

cd Aarogya



\# Install dependencies

npm install



\# Configure environment

touch .env

\# Add your credentials to .env file



\# Start development server

npm run dev

Q3: MongoDB Atlas connection fails. How to fix?

A: Common solutions:



Whitelist your IP: Add it in MongoDB Atlas Network Access



Check credentials: Verify username/password are correct



Database exists: Ensure database is created



Connection string: Format: mongodb+srv://user:pass@cluster.mongodb.net/dbname



VPN: Disable VPN if blocking MongoDB



🔥 Common Problems

Q4: Why am I getting "JWT Verification Failed"?

A: This usually means:



bash

\# The JWT\_SECRET doesn't match between:

\# 1. Token generation (login)

\# 2. Token verification (middleware)



\# Solution: Ensure JWT\_SECRET is same in all environments

JWT\_SECRET=your-consistent-secret-key

Q5: How to clear database and start fresh?

A: Methods to reset data:



javascript

// Method 1: MongoDB Shell

db.users.deleteMany({})

db.appointments.deleteMany({})



// Method 2: Seed script (if available)

npm run seed:reset



// Method 3: Recreate database

// Delete and recreate collections in MongoDB Atlas

Q6: AI features not working. What's wrong?

A: Check this checklist:



OPENAI\_API\_KEY is set in .env



API key is valid (not expired)



Internet connection is active



No rate limiting errors



Correct API endpoint URL



👨‍💻 Development Guide

Q7: What's the branching strategy?

A: Our workflow:



bash

\# Main branches

\- main        # Production-ready code

\- develop     # Integration branch



\# Feature branches

git checkout -b feature/your-feature

git checkout -b fix/bug-description

git checkout -b docs/update-documentation

Q8: How to write good commit messages?

A: Follow the format:



text

<type>(<scope>): <subject>



<body>



<footer>

Examples:



text

feat(auth): add password reset functionality



Implement email-based password reset flow

\- Generate reset tokens

\- Send email with reset link

\- Validate token on reset



Closes #15

text

fix(booking): correct appointment timezone issue



Convert UTC times to local timezone for display

\- Add moment-timezone library

\- Update appointment model

\- Fix display in dashboard



Closes #22

Q9: Testing process explained?

A: Three levels:



Test Type	Command	Purpose

Unit	npm test:unit	Test individual functions

Integration	npm test:integration	Test API endpoints

E2E	npm test:e2e	Test full user journeys

bash

\# Run all tests

npm test



\# Watch mode

npm test -- --watch



\# With coverage

npm test -- --coverage

Q10: Which environment variables are required?

A: Complete list:



env

\# Server

PORT=5000

NODE\_ENV=development



\# Database

MONGO\_URL=mongodb+srv://...



\# Security

JWT\_SECRET=your-secret-key

JWT\_EXPIRE=7d

COOKIE\_SECRET=your-cookie-secret



\# AI Services

OPENAI\_API\_KEY=sk-...



\# Email (SendGrid)

SENDGRID\_API\_KEY=your-key

FROM\_EMAIL=noreply@aarogya.com

🏛️ Architecture Insights

Q11: How is the code organized?

A: Structure follows MVC pattern:



text

Aarogya/

├── server.js           # Application entry point

├── models/             # Database schemas

│   ├── User.js         # User model

│   └── Appointment.js  # Appointment model

├── controllers/        # Business logic

│   ├── authController.js

│   └── appointmentController.js

├── routes/             # URL routing

│   └── apiRoutes.js

├── views/              # EJS templates

│   ├── login.ejs

│   └── dashboard.ejs

├── public/             # Static assets

│   ├── css/

│   ├── js/

│   └── img/

└── config/             # Configuration

&#x20;   ├── database.js

&#x20;   └── passport.js

Q12: Database choice and reasoning?

A: Using MongoDB Atlas:



Feature	Benefit

Schema Flexibility	Easy to iterate features

Scalability	Handles growing data

Cloud Managed	No maintenance overhead

Security	Built-in encryption \& auth

Cost-effective	Free tier available

🔧 Troubleshooting Tips

Q13: "Port already in use" error?

A: Resolve with:



bash

\# Kill process on port 5000

sudo lsof -i :5000

sudo kill -9 <PID>



\# Alternative: Use different port

PORT=5001 npm start

Q14: Dependencies failing to install?

A: Solutions:



bash

\# Clear npm cache

npm cache clean --force



\# Remove and reinstall

rm -rf node\_modules package-lock.json

npm install



\# Use legacy peer dependencies

npm install --legacy-peer-deps



\# Force resolution

npm install --force

Q15: Browser shows old version of code?

A: Try these:



bash

\# 1. Clear browser cache

\# Chrome: Ctrl+Shift+Delete

\# Safari: Cmd+Option+E

\# Firefox: Ctrl+Shift+Delete



\# 2. Hard reload

\# Windows: Ctrl+F5

\# Mac: Cmd+Shift+R



\# 3. Restart dev server

npm run dev



\# 4. Check for service workers

\# Chrome DevTools → Application → Service Workers → Unregister

Q16: Debugging techniques?

A: Our recommended tools:



VS Code Debugger: Step through code



Chrome DevTools: Frontend debugging



Postman: API testing



MongoDB Compass: Data inspection



Winston/Morgan: Logging



Node Inspector: node --inspect



🤝 Community Guidelines

Q17: How to contribute effectively?

A: Contribution process:



Find an issue: Search good-first-issue label



Get assigned: Comment on issue



Fork \& branch: Create feature branch



Develop: Write code with tests



Submit PR: Follow PR template



Review: Respond to feedback



Q18: Where to ask questions?

A: Support channels:



Channel	Purpose

GitHub Issues	Technical problems

Discord	Community chat

Email	Formal inquiries

Documentation	Self-service learning

Q19: Testing coverage standards?

A: We aim for:



Unit Tests: 80%+ coverage



Integration Tests: All critical paths



E2E Tests: All user journeys



API Tests: Every endpoint



Q20: Security best practices?

A: Always follow:



✅ Use environment variables



✅ Hash passwords (bcrypt)



✅ Validate all inputs



✅ Use HTTPS in production



✅ Regular dependency updates



✅ Security headers (Helmet)



✅ Rate limiting



✅ Input sanitization



📖 Resources \& References

Useful Documentation

Contributing Guide



API Documentation



Style Guide



Architecture Decisions



External Resources

Node.js Documentation



MongoDB Docs



EJS Docs



Express Guide



Updated: November 2026 | Version: 1.0.0

