\# 🚀 Aarogya - Production Deployment \& Operations Guide



\## 📑 Table of Contents

\- \[Introduction](#introduction)

\- \[Deployment Architecture](#deployment-architecture)

\- \[Environment Configuration](#environment-configuration)

\- \[Pre-Deployment Preparation](#pre-deployment-preparation)

\- \[Deployment Workflow](#deployment-workflow)

\- \[Post-Deployment Validation](#post-deployment-validation)

\- \[Rollback Strategy](#rollback-strategy)

\- \[Monitoring \& Alerting](#monitoring--alerting)

\- \[Troubleshooting Handbook](#troubleshooting-handbook)



\---



\## 🎯 Introduction



\### Purpose

This guide provides comprehensive instructions for deploying the Aarogya application to production environments, ensuring consistent, reliable, and secure deployments.



\### Audience

\- DevOps Engineers

\- Backend Developers

\- System Administrators

\- Project Managers



\### Scope

\- Production environment setup

\- Deployment procedures

\- Post-deployment verification

\- Emergency procedures



\---



\## 🏗️ Deployment Architecture



\### System Overview



┌─────────────────────────────────────────────────────────────────┐

│ PRODUCTION INFRASTRUCTURE │

├─────────────────────────────────────────────────────────────────┤

│ │

│ ┌──────────────────────────────────────────────────────────┐ │

│ │ Render Platform │ │

│ │ │ │

│ │ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ │ │

│ │ │ Web App │ │ Web App │ │ Web App │ │ │

│ │ │ Instance │ │ Instance │ │ Instance │ │ │

│ │ │ (Port 5000)│ │ (Port 5001)│ │ (Port 5002)│ │ │

│ │ └──────────────┘ └──────────────┘ └──────────────┘ │ │

│ └──────────────────────────────────────────────────────────┘ │

│ │ │

│ ▼ │

│ ┌──────────────────────────────────────────────────────────┐ │

│ │ MongoDB Atlas │ │

│ │ │ │

│ │ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ │ │

│ │ │ Primary │ │ Secondary │ │ Arbiter │ │ │

│ │ │ (Write) │ │ (Read) │ │ (Vote) │ │ │

│ │ └──────────────┘ └──────────────┘ └──────────────┘ │ │

│ └──────────────────────────────────────────────────────────┘ │

│ │

└─────────────────────────────────────────────────────────────────┘



text



\### Key Components



| Component | Technology | Purpose |

|-----------|------------|---------|

| \*\*Application Server\*\* | Node.js v18+ | Execute application logic |

| \*\*Web Server\*\* | Express.js | Handle HTTP requests |

| \*\*Database\*\* | MongoDB Atlas | Store application data |

| \*\*File Storage\*\* | Render Storage | User uploads, assets |

| \*\*CDN\*\* | Render CDN | Static asset delivery |

| \*\*Load Balancing\*\* | Render LB | Distribute traffic |

| \*\*SSL/TLS\*\* | Let's Encrypt | HTTPS encryption |



\---



\## 🔧 Environment Configuration



\### Required Environment Variables



```env

\# ============================================

\# CORE APPLICATION

\# ============================================

PORT=5000

NODE\_ENV=production

APP\_NAME=Aarogya

APP\_URL=https://aarogya-health.com



\# ============================================

\# DATABASE

\# ============================================

MONGO\_URL=mongodb+srv://username:password@cluster.mongodb.net/aarogya

MONGO\_POOL\_SIZE=10

MONGO\_TIMEOUT=5000



\# ============================================

\# AUTHENTICATION

\# ============================================

JWT\_SECRET=your-strong-production-secret-key

JWT\_EXPIRY=7d

COOKIE\_SECRET=your-cookie-encryption-secret

SESSION\_SECRET=your-session-secret



\# ============================================

\# AI SERVICES

\# ============================================

OPENAI\_API\_KEY=sk-your-production-api-key

OPENAI\_MODEL=gpt-3.5-turbo

AI\_TIMEOUT=30000



\# ============================================

\# EMAIL CONFIGURATION

\# ============================================

SMTP\_HOST=smtp.sendgrid.net

SMTP\_PORT=587

SMTP\_USER=apikey

SMTP\_PASS=your-sendgrid-api-key

FROM\_EMAIL=noreply@aarogya-health.com



\# ============================================

\# SECURITY

\# ============================================

CORS\_ORIGIN=https://aarogya-health.com

RATE\_LIMIT\_WINDOW=60000

RATE\_LIMIT\_MAX=100

HELMET\_ENABLED=true



\# ============================================

\# MONITORING

\# ============================================

LOG\_LEVEL=info

SENTRY\_DSN=your-sentry-dsn (optional)

NEW\_RELIC\_KEY=your-new-relic-key (optional)

Setting Up Environment Variables

bash

\# Method 1: Render Dashboard

\# 1. Login to Render Dashboard

\# 2. Select Aarogya Service

\# 3. Navigate to "Environment"

\# 4. Click "Add Environment Variable"

\# 5. Add each variable from above

\# 6. Click "Save Changes"

\# 7. Service auto-restarts



\# Method 2: Render CLI

render env set NODE\_ENV production

render env set MONGO\_URL "your-connection-string"

render env set JWT\_SECRET "your-secret"

\# Repeat for all variables



\# Method 3: .env File (not recommended for production)

\# Create .env file in project root

\# Add all variables

\# Ensure .env is in .gitignore

✅ Pre-Deployment Preparation

Code Quality Checks

bash

\# 1. Run all tests

npm test



\# 2. Check code coverage

npm test -- --coverage

\# Target: 80%+ coverage



\# 3. Lint code

npm run lint

\# Fix issues if any



\# 4. Security audit

npm audit

\# Fix critical vulnerabilities



\# 5. Check dependencies

npm outdated

\# Update outdated packages



\# 6. Run security scan

npx snyk test

Build Preparation

bash

\# 1. Clean build directory

rm -rf dist/



\# 2. Build application

npm run build



\# 3. Verify build

ls dist/

\# Ensure all files present



\# 4. Test build locally

NODE\_ENV=production node dist/server.js

\# Test all endpoints

Database Migration

javascript

// migrations/001-add-appointment-notes.js

const mongoose = require('mongoose');



async function up() {

&#x20;   // Add new field

&#x20;   await Appointment.updateMany(

&#x20;       {},

&#x20;       { $set: { notes: '' } }

&#x20;   );

&#x20;   console.log('Migration 001 completed');

}



async function down() {

&#x20;   // Rollback

&#x20;   await Appointment.updateMany(

&#x20;       {},

&#x20;       { $unset: { notes: '' } }

&#x20;   );

&#x20;   console.log('Migration 001 rolled back');

}



module.exports = { up, down };

Deployment Checklist

All tests passing



Code coverage ≥ 80%



No security vulnerabilities



Dependencies updated



Environment variables configured



Database migrations ready



Build successful



Documentation updated



Monitoring configured



Rollback plan ready



🚀 Deployment Workflow

Step 1: Prepare Deployment

bash

\# 1. Pull latest changes

git checkout main

git pull origin main



\# 2. Install dependencies

npm install --production



\# 3. Run migrations

npm run migrate



\# 4. Build application

npm run build

Step 2: Deploy to Render

Option A: Automatic Deployment (Recommended)



bash

\# Push to main branch triggers auto-deploy

git add .

git commit -m "chore: prepare for release"

git push origin main



\# Monitor deployment

\# Render Dashboard → Deployments

\# Wait for "Deployed Successfully"

Option B: Manual Deployment



bash

\# 1. Login to Render Dashboard

\# 2. Select Aarogya Service

\# 3. Click "Manual Deploy"

\# 4. Select branch (main)

\# 5. Click "Deploy"

\# 6. Monitor logs

Option C: CLI Deployment



bash

\# Install Render CLI

npm install -g render-cli



\# Login

render login



\# Deploy

render deploy --service aarogya --branch main

Step 3: Verify Deployment

bash

\# 1. Health check

curl https://aarogya-health.com/health



\# Expected response:

{

&#x20;   "status": "healthy",

&#x20;   "timestamp": "2024-11-24T10:00:00.000Z",

&#x20;   "uptime": 120,

&#x20;   "environment": "production"

}



\# 2. Test API endpoints

curl https://aarogya-health.com/api/doctors

curl https://aarogya-health.com/api/appointments



\# 3. Check logs

render logs --tail

\# Look for errors

🔍 Post-Deployment Validation

Smoke Tests

bash

\# 1. Authentication test

curl -X POST https://aarogya-health.com/login \\

&#x20;   -H "Content-Type: application/json" \\

&#x20;   -d '{"email":"admin@test.com","password":"Test123!"}'



\# 2. Protected route test

curl https://aarogya-health.com/dashboard \\

&#x20;   -H "Cookie: token=your-jwt-token"



\# 3. API endpoint test

curl https://aarogya-health.com/api/doctors \\

&#x20;   -H "Authorization: Bearer your-token"

Performance Validation

bash

\# 1. Response time test

time curl -s https://aarogya-health.com/health



\# 2. Load test (using Apache Bench)

ab -n 1000 -c 50 https://aarogya-health.com/api/doctors



\# 3. Monitor response times

render metrics --tail

Database Validation

javascript

// 1. Check database connection

const mongoose = require('mongoose');

mongoose.connection.readyState // Should be 1



// 2. Verify collections exist

await mongoose.connection.db.listCollections().toArray()



// 3. Check data integrity

await User.countDocuments() // Should match expected

await Appointment.countDocuments() // Should match expected

🔄 Rollback Strategy

When to Rollback

⚠️ Critical bugs discovered



📉 Performance degradation > 50%



🔒 Security vulnerabilities found



💾 Data corruption detected



❌ Broken functionality



Quick Rollback

bash

\# Step 1: Check deployment history

render deployments



\# Step 2: Identify previous version

render deployments --limit 5



\# Step 3: Rollback to version

render rollback --version <version-id>



\# Step 4: Verify rollback

curl https://aarogya-health.com/health

Database Rollback

javascript

// 1. Connect to production

await mongoose.connect(process.env.MONGO\_URL);



// 2. Run rollback migration

const { down } = require('./migrations/001-add-appointment-notes');

await down();



// 3. Verify rollback

const appointment = await Appointment.findOne({});

console.log(appointment.notes); // Should be undefined



// 4. Record rollback

console.log('Rollback completed successfully');

Communication Plan

Stage	Action	Responsible

Detection	Identify issue	Monitoring Team

Decision	Evaluate severity	Tech Lead

Execution	Perform rollback	DevOps Team

Verification	Confirm rollback	QA Team

Communication	Notify stakeholders	Project Manager

📊 Monitoring \& Alerting

Health Check Monitoring

javascript

// health.js - Health check endpoint

app.get('/health', (req, res) => {

&#x20;   const health = {

&#x20;       status: 'healthy',

&#x20;       timestamp: new Date().toISOString(),

&#x20;       uptime: process.uptime(),

&#x20;       memory: process.memoryUsage(),

&#x20;       database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'

&#x20;   };



&#x20;   const status = health.database === 'connected' ? 200 : 503;

&#x20;   res.status(status).json(health);

});

Logging Setup

javascript

// logger.js - Winston configuration

const winston = require('winston');



const logger = winston.createLogger({

&#x20;   level: process.env.LOG\_LEVEL || 'info',

&#x20;   format: winston.format.combine(

&#x20;       winston.format.timestamp(),

&#x20;       winston.format.errors({ stack: true }),

&#x20;       winston.format.json()

&#x20;   ),

&#x20;   transports: \[

&#x20;       new winston.transports.File({

&#x20;           filename: 'logs/error.log',

&#x20;           level: 'error'

&#x20;       }),

&#x20;       new winston.transports.File({

&#x20;           filename: 'logs/combined.log'

&#x20;       })

&#x20;   ]

});



if (process.env.NODE\_ENV !== 'production') {

&#x20;   logger.add(new winston.transports.Console({

&#x20;       format: winston.format.simple()

&#x20;   }));

}

Performance Monitoring

bash

\# Monitor with Render Dashboard

\# - CPU Usage

\# - Memory Usage

\# - Response Times

\# - Error Rates



\# Monitor with external tools

\# - New Relic: Performance monitoring

\# - Sentry: Error tracking

\# - UptimeRobot: Uptime monitoring

Alert Rules

Metric	Threshold	Action

Response Time	> 2s	Investigate

Error Rate	> 5%	Immediate action

CPU Usage	> 80%	Scale up

Memory Usage	> 85%	Restart service

Uptime	< 99.9%	Emergency response

🐛 Troubleshooting Handbook

Issue 1: Application Fails to Start

Symptoms:



"Failed to start" error



"Port 5000 already in use"



Process exits immediately



Solutions:



bash

\# Check if process is running

ps aux | grep node



\# Find process on port

lsof -i :5000



\# Kill process

kill -9 <PID>



\# Check for syntax errors

node -c server.js



\# Check environment variables

node -e "console.log(process.env.NODE\_ENV)"

Issue 2: Database Connection Failed

Symptoms:



"MongoNetworkError"



"Connection timed out"



"Authentication failed"



Solutions:



bash

\# Check MongoDB Atlas status

\# https://status.mongodb.com/



\# Verify IP whitelist

\# MongoDB Atlas → Network Access → Add IP



\# Test connection string

node -e "require('mongoose').connect(process.env.MONGO\_URL)"



\# Check network connectivity

ping cluster.mongodb.net



\# Verify credentials

\# Users → Your User → Reset Password if needed

Issue 3: High Memory Usage

Symptoms:



"Out of memory" errors



Slow response times



Frequent crashes



Solutions:



javascript

// Increase Node.js memory limit

node --max-old-space-size=4096 server.js



// In package.json

"scripts": {

&#x20;   "start": "node --max-old-space-size=4096 server.js"

}



// Check for memory leaks

node --inspect server.js

// Use Chrome DevTools to profile memory



// Enable garbage collection logging

node --trace-gc server.js

Issue 4: CORS Errors

Symptoms:



"No 'Access-Control-Allow-Origin' header"



API calls blocked in browser



Solutions:



javascript

// Configure CORS properly

const cors = require('cors');



app.use(cors({

&#x20;   origin: process.env.CORS\_ORIGIN,

&#x20;   credentials: true,

&#x20;   methods: \['GET', 'POST', 'PUT', 'DELETE'],

&#x20;   allowedHeaders: \['Content-Type', 'Authorization']

}));



// For development

app.use(cors({

&#x20;   origin: '\*',

&#x20;   credentials: true

}));

Issue 5: Slow Performance

Symptoms:



Pages load slowly



API responses > 2s



High CPU usage



Solutions:



javascript

// Add database indexes

UserSchema.index({ email: 1 });

AppointmentSchema.index({ doctor: 1, date: -1 });



// Use lean() for queries

const users = await User.find({}).lean();



// Use aggregation for joins

const appointments = await Appointment.aggregate(\[

&#x20;   { $match: { doctor: doctorId } },

&#x20;   { $lookup: { from: 'users', localField: 'patient', foreignField: '\_id', as: 'patient' } },

&#x20;   { $limit: 100 }

]);



// Enable compression

const compression = require('compression');

app.use(compression());

📝 Emergency Procedures

Critical Failure Protocol

text

1\. DETECT

&#x20;  - Monitor alerts trigger

&#x20;  - User reports issue

&#x20;  - Health check fails



2\. ASSESS

&#x20;  - Identify affected components

&#x20;  - Determine severity

&#x20;  - Estimate impact



3\. RESPOND

&#x20;  - Notify team immediately

&#x20;  - Check application logs

&#x20;  - Verify database connection

&#x20;  - Check environment variables



4\. RESOLVE

&#x20;  - Apply fix (if simple)

&#x20;  - Rollback to previous version

&#x20;  - Restart services

&#x20;  - Scale resources if needed



5\. RECOVER

&#x20;  - Verify system is functional

&#x20;  - Monitor for reoccurrence

&#x20;  - Document incident

&#x20;  - Plan prevention

Contact List

Role	Contact	Response Time

DevOps Lead	devops@aarogya.com	15 minutes

Backend Lead	backend@aarogya.com	30 minutes

Database Admin	dba@aarogya.com	1 hour

Project Manager	pm@aarogya.com	1 hour

🔗 Resources

Documentation

Render Documentation



MongoDB Atlas Guide



Node.js Production Best Practices



Internal References

Project README



Architecture Overview



API Documentation



Contributing Guide



\~BY Team AAROGYA

