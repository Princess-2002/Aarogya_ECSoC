\# 🔒 Aarogya - Security Guidelines \& Best Practices



\## 📋 Introduction



This document provides a comprehensive overview of the security architecture, practices, and guidelines implemented in the Aarogya application. It serves as a reference for developers to maintain and enhance security standards.



\---



\## 📑 Table of Contents



\- \[Security Overview](#security-overview)

\- \[Authentication Security](#authentication-security)

\- \[Password Protection](#password-protection)

\- \[Session Security](#session-security)

\- \[Environment Protection](#environment-protection)

\- \[Input Security](#input-security)

\- \[Header Security](#header-security)

\- \[Request Limiting](#request-limiting)

\- \[Data Security](#data-security)

\- \[External Services](#external-services)

\- \[Security Audit Checklist](#security-audit-checklist)

\- \[Incident Handling](#incident-handling)



\---



\## 🏛️ Security Overview



\### Security Architecture Diagram



┌─────────────────────────────────────────────────────────────────┐

│ SECURITY ARCHITECTURE │

├─────────────────────────────────────────────────────────────────┤

│ │

│ ┌─────────────────────────────────────────────────────────┐ │

│ │ CLIENT SIDE │ │

│ │ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ │ │

│ │ │ HTTPS │ │ Secure │ │ CORS │ │ │

│ │ │ (TLS) │ │ Cookies │ │ Policy │ │ │

│ │ └─────────────┘ └─────────────┘ └─────────────┘ │ │

│ └─────────────────────────────────────────────────────────┘ │

│ │ │

│ ┌─────────────────────────────────────────────────────────┐ │

│ │ APPLICATION SIDE │ │

│ │ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ │ │

│ │ │ JWT │ │ Input │ │ Rate │ │ │

│ │ │ Auth │ │ Validation │ │ Limiter │ │ │

│ │ └─────────────┘ └─────────────┘ └─────────────┘ │ │

│ └─────────────────────────────────────────────────────────┘ │

│ │ │

│ ┌─────────────────────────────────────────────────────────┐ │

│ │ DATA SIDE │ │

│ │ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ │ │

│ │ │ Bcrypt │ │ MongoDB │ │ Audit │ │ │

│ │ │ Hashed │ │ (Atlas) │ │ Logs │ │ │

│ │ └─────────────┘ └─────────────┘ └─────────────┘ │ │

│ └─────────────────────────────────────────────────────────┘ │

│ │

└─────────────────────────────────────────────────────────────────┘



text



\### Security Principles



| Principle | Description | Implementation |

|-----------|-------------|----------------|

| \*\*Defense in Depth\*\* | Multiple security layers | Layered security controls |

| \*\*Least Privilege\*\* | Minimum required access | RBAC implementation |

| \*\*Fail Secure\*\* | Fail to secure state | Default deny approach |

| \*\*Separation of Duties\*\* | Role separation | Doctor/patient separation |



\---



\## 🔐 Authentication Security



\### JWT Configuration



```javascript

const jwt = require('jsonwebtoken');



// Token generation

const generateToken = (user) => {

&#x20;   return jwt.sign(

&#x20;       { id: user.\_id, role: user.role },

&#x20;       process.env.JWT\_SECRET,

&#x20;       { expiresIn: '1h' }

&#x20;   );

};



// Token verification

const verifyToken = (token) => {

&#x20;   try {

&#x20;       return jwt.verify(token, process.env.JWT\_SECRET);

&#x20;   } catch (error) {

&#x20;       throw new Error('Invalid or expired token');

&#x20;   }

};

Authentication Best Practices

Practice	Implementation	Benefit

Strong Secret	32+ character random string	Prevents token forgery

Short Expiry	1 hour expiration	Limits token misuse window

HTTP-Only Cookie	httpOnly: true	Prevents XSS token theft

Secure Flag	secure: true (prod)	Requires HTTPS

SameSite Attribute	SameSite: 'Strict'	CSRF protection

Role-Based Access Control

javascript

const requireRole = (allowedRoles) => {

&#x20;   return (req, res, next) => {

&#x20;       if (!req.user) {

&#x20;           return res.status(401).json({ 

&#x20;               success: false, 

&#x20;               message: 'Authentication required' 

&#x20;           });

&#x20;       }

&#x20;       if (!allowedRoles.includes(req.user.role)) {

&#x20;           return res.status(403).json({

&#x20;               success: false,

&#x20;               message: 'Insufficient permissions'

&#x20;           });

&#x20;       }

&#x20;       next();

&#x20;   };

};



// Usage

router.get('/patient', requireAuth, requireRole(\['patient']), handler);

router.get('/doctor', requireAuth, requireRole(\['doctor']), handler);

🔑 Password Protection

Bcrypt Implementation

javascript

const bcrypt = require('bcryptjs');



// Hash password (10 salt rounds)

const hashPassword = async (password) => {

&#x20;   return await bcrypt.hash(password, 10);

};



// Verify password

const verifyPassword = async (password, hashedPassword) => {

&#x20;   return await bcrypt.compare(password, hashedPassword);

};

Password Security Requirements

Requirement	Detail	Why

Minimum Length	8 characters	Prevents dictionary attacks

Uppercase Letter	At least one	Increases complexity

Lowercase Letter	At least one	Increases complexity

Number	At least one	Increases complexity

Special Character	At least one	Increases complexity

Hashing	bcrypt with 10 rounds	Resists brute force

No Plain Text	Never stored	Prevents data breach exposure

Password Validation

javascript

const validatePassword = (password) => {

&#x20;   const errors = \[];

&#x20;   

&#x20;   if (password.length < 8) {

&#x20;       errors.push('Password must be at least 8 characters');

&#x20;   }

&#x20;   if (!/\[A-Z]/.test(password)) {

&#x20;       errors.push('Password must contain an uppercase letter');

&#x20;   }

&#x20;   if (!/\[a-z]/.test(password)) {

&#x20;       errors.push('Password must contain a lowercase letter');

&#x20;   }

&#x20;   if (!/\[0-9]/.test(password)) {

&#x20;       errors.push('Password must contain a number');

&#x20;   }

&#x20;   if (!/\[^a-zA-Z0-9]/.test(password)) {

&#x20;       errors.push('Password must contain a special character');

&#x20;   }

&#x20;   

&#x20;   return errors;

};

🍪 Session Security

Cookie Configuration

javascript

const setSecureCookie = (res, name, value, options = {}) => {

&#x20;   res.cookie(name, value, {

&#x20;       httpOnly: true,

&#x20;       secure: process.env.NODE\_ENV === 'production',

&#x20;       sameSite: 'strict',

&#x20;       maxAge: options.maxAge || 3600000,

&#x20;       path: options.path || '/',

&#x20;       ...options

&#x20;   });

};



// Usage

setSecureCookie(res, 'token', token, { maxAge: 3600000 });

Cookie Security Attributes

Attribute	Recommended Value	Purpose

httpOnly	true	Prevents JavaScript access

secure	true (prod)	HTTPS only

sameSite	'Strict'	CSRF protection

maxAge	3600000 (1 hour)	Limited session

path	'/'	Site-wide availability

🔧 Environment Protection

Environment Variables Setup

env

\# ============================================

\# CORE ENVIRONMENT VARIABLES

\# ============================================



\# Application

PORT=5000

NODE\_ENV=production



\# Database

MONGO\_URL=mongodb+srv://user:pass@cluster.mongodb.net/aarogya



\# JWT

JWT\_SECRET=your-strong-32-character-secret-key



\# AI Services

OPENAI\_API\_KEY=sk-your-production-api-key



\# Email

SMTP\_HOST=smtp.sendgrid.net

SMTP\_PORT=587

SMTP\_USER=apikey

SMTP\_PASS=your-sendgrid-api-key

FROM\_EMAIL=noreply@aarogya-health.com



\# Security

CORS\_ORIGIN=https://aarogya-health.com

RATE\_LIMIT\_WINDOW=60000

RATE\_LIMIT\_MAX=100



\# ============================================

\# MONITORING VARIABLES

\# ============================================



LOG\_LEVEL=info

SENTRY\_DSN=your-sentry-dsn

Environment Security Rules

Rule	Implementation	Consequence

Never Commit .env	.env in .gitignore	Prevents secret exposure

Use Strong Secrets	32+ character strings	Prevents brute force

Separate Environments	Different keys per env	Limits breach impact

Regular Rotation	Quarterly secret rotation	Reduces exposure window

Least Privilege	Minimum required access	Limits damage

✅ Input Security

Validation Framework

javascript

const validateInput = (schema) => {

&#x20;   return (req, res, next) => {

&#x20;       const errors = \[];

&#x20;       

&#x20;       for (const \[field, rules] of Object.entries(schema)) {

&#x20;           const value = req.body\[field];

&#x20;           for (const rule of rules) {

&#x20;               try {

&#x20;                   rule(value);

&#x20;               } catch (error) {

&#x20;                   errors.push({ field, message: error.message });

&#x20;                   break;

&#x20;               }

&#x20;           }

&#x20;       }

&#x20;       

&#x20;       if (errors.length > 0) {

&#x20;           return res.status(400).json({

&#x20;               success: false,

&#x20;               status: 400,

&#x20;               code: 'VALIDATION\_ERROR',

&#x20;               errors,

&#x20;               timestamp: new Date().toISOString()

&#x20;           });

&#x20;       }

&#x20;       next();

&#x20;   };

};

Validation Rules Reference

Rule	Function	Example

Required	Field must exist	rules.required('email')

Email	Valid email format	rules.email('email')

Min Length	Minimum characters	rules.minLength('password', 8)

Max Length	Maximum characters	rules.maxLength('name', 100)

Range	Numeric range	rules.range('age', 0, 150)

One Of	Allowed values	rules.oneOf('role', \['patient', 'doctor'])

🛡️ Header Security

Helmet Configuration

javascript

const helmet = require('helmet');



app.use(helmet({

&#x20;   contentSecurityPolicy: {

&#x20;       directives: {

&#x20;           defaultSrc: \["'self'"],

&#x20;           scriptSrc: \["'self'", "'unsafe-inline'"],

&#x20;           styleSrc: \["'self'", "'unsafe-inline'"],

&#x20;           imgSrc: \["'self'", "data:", "https:"],

&#x20;           connectSrc: \["'self'"],

&#x20;           fontSrc: \["'self'"],

&#x20;           objectSrc: \["'none'"],

&#x20;           upgradeInsecureRequests: \[]

&#x20;       }

&#x20;   },

&#x20;   hsts: {

&#x20;       maxAge: 31536000,

&#x20;       includeSubDomains: true,

&#x20;       preload: true

&#x20;   },

&#x20;   frameguard: { action: 'deny' },

&#x20;   noSniff: true,

&#x20;   xssFilter: true

}));

Security Headers Overview

Header	Value	Protection

X-Content-Type-Options	nosniff	MIME sniffing

X-Frame-Options	DENY	Clickjacking

X-XSS-Protection	1; mode=block	XSS attacks

Strict-Transport-Security	max-age=31536000	HTTPS enforcement

Content-Security-Policy	Custom policy	Content injection

🚦 Request Limiting

Rate Limiter Configuration

javascript

const rateLimit = require('express-rate-limit');



// General rate limiter

const generalLimiter = rateLimit({

&#x20;   windowMs: 15 \* 60 \* 1000,

&#x20;   max: 100,

&#x20;   message: { success: false, message: 'Too many requests' }

});



// Authentication rate limiter

const authLimiter = rateLimit({

&#x20;   windowMs: 15 \* 60 \* 1000,

&#x20;   max: 10,

&#x20;   message: { success: false, message: 'Too many login attempts' }

});



// Apply to routes

app.use('/api/auth/login', authLimiter);

app.use('/api/', generalLimiter);

💾 Data Security

MongoDB Connection Security

javascript

const mongoose = require('mongoose');



mongoose.connect(process.env.MONGO\_URL, {

&#x20;   useNewUrlParser: true,

&#x20;   useUnifiedTopology: true,

&#x20;   maxPoolSize: 10,

&#x20;   serverSelectionTimeoutMS: 5000,

&#x20;   socketTimeoutMS: 45000,

&#x20;   ssl: true,

&#x20;   sslValidate: true

});

Data Security Practices

Practice	Implementation	Benefit

SSL/TLS	ssl: true	Encrypts data in transit

IP Whitelist	MongoDB Atlas	Restricts access

Limited Roles	Read/write only	Prevents schema changes

Encrypted Backups	Atlas encryption	Protects backups

Audit Logs	Atlas audit	Tracks access

🔌 External Services

External API Security

javascript

const axios = require('axios');



const callExternalAPI = async (endpoint, data) => {

&#x20;   try {

&#x20;       const response = await axios.post(endpoint, data, {

&#x20;           headers: {

&#x20;               'Authorization': `Bearer ${process.env.API\_KEY}`,

&#x20;               'Content-Type': 'application/json'

&#x20;           },

&#x20;           timeout: 30000

&#x20;       });

&#x20;       return response.data;

&#x20;   } catch (error) {

&#x20;       console.error('External API error:', error.message);

&#x20;       throw new Error('External service unavailable');

&#x20;   }

};

Third-Party Security Rules

✅ Store API keys in environment variables



✅ Never log API keys or tokens



✅ Implement request timeouts



✅ Validate all external responses



✅ Handle errors gracefully



✅ Use HTTPS for all external calls



✅ Security Audit Checklist

Development Security

All secrets in .env file



.env in .gitignore



HTTP-only cookies for JWT



Secure cookie flag in production



Rate limiting implemented



Input validation middleware



Password hashing with bcrypt



Security headers (Helmet)



CORS with specific origins



HTTPS in production



Updated dependencies



Security audit run (npm audit)



Production Security

HTTPS enabled



Security headers configured



Rate limiting active



IP whitelist set in Atlas



Strong JWT secret



Production environment variables



Error logging configured



Monitoring active



Backup strategy in place



Incident response plan



🚨 Incident Handling

Incident Response Process

text

┌─────────────────────────────────────────────────────────────────┐

│                    INCIDENT RESPONSE FLOW                      │

└─────────────────────────────────────────────────────────────────┘



1\. DETECT

&#x20;  └── Identify the incident

&#x20;      ├── Monitor alerts

&#x20;      ├── User reports

&#x20;      └── Log analysis



2\. CONTAIN

&#x20;  └── Limit damage

&#x20;      ├── Isolate systems

&#x20;      ├── Disable accounts

&#x20;      └── Block traffic



3\. INVESTIGATE

&#x20;  └── Find root cause

&#x20;      ├── Review logs

&#x20;      ├── Analyze patterns

&#x20;      └── Identify vulnerability



4\. REMEDIATE

&#x20;  └── Fix the issue

&#x20;      ├── Apply patches

&#x20;      ├── Rotate secrets

&#x20;      └── Update controls



5\. RECOVER

&#x20;  └── Restore operations

&#x20;      ├── Re-enable systems

&#x20;      ├── Restore data

&#x20;      └── Verify security



6\. LEARN

&#x20;  └── Prevent recurrence

&#x20;      ├── Document incident

&#x20;      ├── Update practices

&#x20;      └── Train team

Emergency Contacts

Role	Contact	Response

Security Lead	security@aarogya.com	15 minutes

DevOps Lead	devops@aarogya.com	30 minutes

Project Manager	pm@aarogya.com	1 hour

📚 Resources

Security References

OWASP Top 10



Node.js Security



Express Security



MongoDB Security



Security Tools

npm audit - Vulnerability scanning



Helmet.js - Security headers



Express Rate Limit - Rate limiting



Snyk - Security monitoring





"Democratizing healthcare through intelligent technology"

