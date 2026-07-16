\# 🔧 Aarogya - Development Workflow Documentation



\## 📋 Overview

This guide covers everything you need to know about developing with Aarogya - from setting up your local environment to deploying to production.



\---



\## 📋 Table of Contents

\- \[System Requirements](#system-requirements)

\- \[Setting Up Development Environment](#setting-up-development-environment)

\- \[Development Cycle](#development-cycle)

\- \[Git Workflow](#git-workflow)

\- \[Testing Strategy](#testing-strategy)

\- \[Build \& Deployment](#build--deployment)

\- \[Debugging Techniques](#debugging-techniques)

\- \[Performance Optimization](#performance-optimization)



\---



\## 💻 System Requirements



\### Minimum Hardware

| Component | Minimum | Recommended |

|-----------|---------|-------------|

| Processor | Dual-core | Quad-core |

| RAM | 4GB | 8GB+ |

| Storage | 2GB free | 10GB free |

| Operating System | Windows 10 / macOS 10.15 / Ubuntu 20.04 | Latest version |



\### Software Dependencies

| Software | Version | Purpose |

|----------|---------|---------|

| Node.js | v18+ | JavaScript runtime |

| npm | v9+ | Package manager |

| MongoDB Atlas | Free tier | Database |

| Git | v2.30+ | Version control |

| Code Editor | Any | VS Code recommended |



\### Recommended VS Code Extensions

\- \*\*ESLint\*\*: Code linting

\- \*\*Prettier\*\*: Code formatting

\- \*\*MongoDB for VS Code\*\*: Database management

\- \*\*EJS Language Support\*\*: Template syntax

\- \*\*GitLens\*\*: Git integration



\---



\## 🚀 Setting Up Development Environment



\### Step-by-Step Guide



```bash

\# 1. Clone the repository

git clone https://github.com/Princess-2002/Aarogya.git

cd Aarogya



\# 2. Install dependencies

npm install



\# 3. Create environment file

cp .env.example .env

\# Edit .env with your values



\# 4. Set up MongoDB

\# Create a MongoDB Atlas account

\# Create a new cluster (M0 free tier)

\# Create a database user

\# Get connection string

\# Add to .env: MONGO\_URL=your\_connection\_string



\# 5. Start development server

npm run dev



\# 6. Verify setup

\# Open browser: http://localhost:5000

\# You should see the landing page


Environment Variables

env

\# .env file

PORT=5000

NODE\_ENV=development



\# MongoDB

MONGO\_URL=mongodb+srv://user:pass@cluster.mongodb.net/aarogya



\# JWT Authentication

JWT\_SECRET=your-strong-secret-key-here



\# OpenAI API

OPENAI\_API\_KEY=sk-your-openai-api-key

🔄 Development Cycle

Daily Workflow

bash

\# 1. Start of day - Get latest code

git checkout develop

git pull upstream develop



\# 2. Create feature branch

git checkout -b feature/your-feature-name



\# 3. Work on your task

\# Write code, run tests, make commits

npm run dev  # Start server with auto-reload



\# 4. Regular commits

git add .

git commit -m "feat(scope): description"



\# 5. Push to remote

git push origin feature/your-feature-name



\# 6. End of day - Push changes

git push origin feature/your-feature-name

Development Tasks

Task	Command	Description

Start Server	npm run dev	Development with auto-reload

Run Tests	npm test	Run all tests

Lint Code	npm run lint	Check for code issues

Format Code	npm run format	Auto-format code

Build	npm run build	Production build

Start Production	npm start	Run production server

🌿 Git Workflow

Branch Hierarchy

text

main

&#x20; └── develop

&#x20;     ├── feature/feature-1

&#x20;     ├── feature/feature-2

&#x20;     ├── fix/bug-1

&#x20;     └── docs/update-docs

Branch Operations

bash

\# Create new branch from develop

git checkout develop

git pull upstream develop

git checkout -b feature/new-feature



\# Delete branch after merge

git branch -d feature/new-feature          # Local

git push origin --delete feature/new-feature  # Remote



\# Switch between branches

git checkout develop

git checkout feature/new-feature



\# View branch status

git branch -a                              # List all branches

git status                                 # Current branch status

Merge Strategies

bash

\# Regular merge

git checkout develop

git merge feature/new-feature



\# Rebase (for cleaner history)

git checkout feature/new-feature

git rebase develop

git checkout develop

git merge feature/new-feature



\# Squash merge (for multiple commits)

git checkout develop

git merge --squash feature/new-feature

git commit -m "feat: add new feature"

🧪 Testing Strategy

Testing Pyramid

text

&#x20;     /\\

&#x20;    /E2E\\      (10%) - End-to-end tests

&#x20;   /------\\

&#x20;  /Integration\\ (20%) - API and integration tests

&#x20; /------------\\

&#x20;/ Unit Tests   \\ (70%) - Component and unit tests

/\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\\

Test Commands

bash

\# Run all tests

npm test



\# Run only unit tests

npm run test:unit



\# Run only integration tests

npm run test:integration



\# Run tests with coverage

npm run test:coverage



\# Run tests in watch mode

npm run test:watch

Writing Tests

javascript

// Unit Test Example

// tests/unit/validation.test.js

const { validateEmail } = require('../../utils/validation');



describe('Email Validation', () => {

&#x20;   test('should accept valid email', () => {

&#x20;       expect(validateEmail('test@example.com')).toBe(true);

&#x20;   });



&#x20;   test('should reject invalid email', () => {

&#x20;       expect(validateEmail('invalid-email')).toBe(false);

&#x20;   });

});



// Integration Test Example

// tests/integration/auth.test.js

const request = require('supertest');

const app = require('../../server');



describe('Authentication API', () => {

&#x20;   test('should login valid user', async () => {

&#x20;       const res = await request(app)

&#x20;           .post('/login')

&#x20;           .send({

&#x20;               email: 'test@example.com',

&#x20;               password: 'password123'

&#x20;           });

&#x20;       expect(res.status).toBe(200);

&#x20;   });

});

📦 Build \& Deployment

Build Process

bash

\# 1. Run tests

npm test



\# 2. Build for production

npm run build



\# 3. Check build

ls dist/  # Verify build files



\# 4. Start production server

NODE\_ENV=production npm start

Deployment Checklist

All tests passing



Code coverage meets target



Environment variables configured



Database migrations ready



Logging configured



Security headers set



Performance tested



Documentation updated



Deploying to Render

bash

\# Automatic deployment via GitHub

\# Connect repository to Render

\# Configure environment variables

\# Build command: npm install \&\& npm run build

\# Start command: npm start

\# Wait for deployment



\# Manual deployment

git push origin main  # Triggers auto-deploy

Post-Deployment Verification

bash

\# Health check

curl https://aarogya-app.com/health



\# Check logs

\# Render dashboard → Logs



\# Verify endpoints

curl https://aarogya-app.com/api/users

🐛 Debugging Techniques

Console Logging

javascript

// Basic logging

console.log('Value:', variable);

console.log('Request body:', req.body);



// Error logging

console.error('Error:', error);



// Grouped logging

console.group('Database Query');

console.log('Query:', query);

console.log('Result:', result);

console.groupEnd();



// Table logging

console.table(users);

VS Code Debugging

json

// .vscode/launch.json

{

&#x20;   "version": "0.2.0",

&#x20;   "configurations": \[

&#x20;       {

&#x20;           "type": "node",

&#x20;           "request": "launch",

&#x20;           "name": "Launch Server",

&#x20;           "program": "${workspaceFolder}/server.js",

&#x20;           "env": {

&#x20;               "NODE\_ENV": "development"

&#x20;           }

&#x20;       }

&#x20;   ]

}

MongoDB Debugging

javascript

// Enable Mongoose debug

mongoose.set('debug', true);



// Explain query

const result = await User.find({ role: 'doctor' })

&#x20;   .explain('executionStats');



// Query logging

console.log('Executing query:', query);

const results = await User.find(query);

console.log('Found:', results.length, 'results');

Network Debugging

bash

\# Check port usage

lsof -i :5000



\# Test API with curl

curl http://localhost:5000/health

curl -X POST http://localhost:5000/login \\

&#x20; -H "Content-Type: application/json" \\

&#x20; -d '{"email":"test@test.com","password":"test123"}'



\# Check headers

curl -I http://localhost:5000

⚡ Performance Optimization

Database Optimization

javascript

// Use lean() for read-only queries

const users = await User.find({}).lean();



// Use indexing

UserSchema.index({ email: 1 });

UserSchema.index({ role: 1, specialization: 1 });



// Use aggregation for joins

const appointments = await Appointment.aggregate(\[

&#x20;   { $match: { doctor: doctorId } },

&#x20;   { $lookup: { from: 'users', localField: 'patient', foreignField: '\_id', as: 'patient' } }

]);

Code Optimization

javascript

// Use const/let, avoid var

const PORT = process.env.PORT || 5000;



// Use async/await

async function fetchData() {

&#x20;   return await Promise.all(\[fetchUser(), fetchAppointments()]);

}



// Use destructuring

const { name, email, role } = user;



// Use spread operator

const updatedUser = { ...user, lastLogin: new Date() };

Server Optimization

javascript

// Use compression

const compression = require('compression');

app.use(compression());



// Use helmet for security

const helmet = require('helmet');

app.use(helmet());



// Use rate limiting

const rateLimit = require('express-rate-limit');

const limiter = rateLimit({

&#x20;   windowMs: 15 \* 60 \* 1000,

&#x20;   max: 100

});

app.use('/api/', limiter);

📚 Additional Resources

Documentation

Project Wiki



API Reference



Contributing Guide



External Resources

Node.js Documentation



Express.js Guide



MongoDB Docs



Jest Testing



Happy Coding! 🚀





