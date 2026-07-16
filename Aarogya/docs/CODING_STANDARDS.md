\# 📋 Aarogya - Coding Conventions \& Style Guidelines



\## 📑 Table of Contents

\- \[Purpose \& Scope](#purpose--scope)

\- \[Core Principles](#core-principles)

\- \[JavaScript Best Practices](#javascript-best-practices)

\- \[CSS Architecture Guidelines](#css-architecture-guidelines)

\- \[EJS Template Conventions](#ejs-template-conventions)

\- \[Version Control Standards](#version-control-standards)

\- \[Testing Framework](#testing-framework)

\- \[Documentation Requirements](#documentation-requirements)

\- \[Quality Assurance Checklist](#quality-assurance-checklist)



\---



\## 🎯 Purpose \& Scope



This document outlines the coding standards and style guidelines for the Aarogya project. Adherence to these standards ensures:



\- \*\*Code Consistency\*\*: Uniform codebase across all contributors

\- \*\*Maintainability\*\*: Easier to understand, modify, and extend

\- \*\*Collaboration\*\*: Smooth teamwork with minimal friction

\- \*\*Quality\*\*: Higher code quality with fewer bugs

\- \*\*Onboarding\*\*: Faster ramp-up for new team members



\---



\## 🧭 Core Principles



\### 1. Clarity Over Cleverness

```javascript

// ✅ GOOD: Clear and readable

const isUserActive = user.status === 'active';



// ❌ BAD: Too clever but unreadable

const isActive = !!user.status.match(/active/);



2\. Consistency Is Key

Follow existing patterns when adding new code



Use the same formatting throughout



Don't mix different coding styles



3\. Keep It Simple

Write straightforward solutions



Avoid unnecessary complexity



Prefer simple over complex



4\. Error-First Thinking

Always consider error scenarios



Handle exceptions properly



Log errors with context



5\. Performance Awareness

Write efficient code



Optimize database queries



Avoid unnecessary operations



💻 JavaScript Best Practices

1\. Variable Declaration

javascript

// ✅ CORRECT: Use const for constants

const API\_VERSION = 'v1';

const MAX\_PAGE\_SIZE = 100;



// ✅ CORRECT: Use let for mutable variables

let sessionCount = 0;

let isProcessing = false;



// ❌ INCORRECT: Never use var

var userName = 'John'; // Avoid this

2\. Function Design

javascript

// ✅ CORRECT: Descriptive function names

function findUserByEmail(email) { ... }

function calculateAverageRating(reviews) { ... }



// ✅ CORRECT: Single responsibility

function validateEmail(email) {

&#x20;   return /^\[^\\s@]+@\[^\\s@]+\\.\[^\\s@]+$/.test(email);

}



// ❌ INCORRECT: Vague or unclear names

function doStuff() { ... }

function process() { ... }



// ❌ INCORRECT: Multiple responsibilities

function validateAndSaveUser(user) {

&#x20;   // Validates AND saves - split these!

}

3\. Async/Await Patterns

javascript

// ✅ CORRECT: Use async/await for promises

async function fetchUserProfile(userId) {

&#x20;   try {

&#x20;       const user = await User.findById(userId);

&#x20;       const appointments = await Appointment.find({ patient: userId });

&#x20;       return { user, appointments };

&#x20;   } catch (error) {

&#x20;       logger.error('Failed to fetch user profile', { userId, error });

&#x20;       throw new Error('Unable to fetch user profile');

&#x20;   }

}



// ❌ INCORRECT: Callback hell

function fetchUserProfile(userId, callback) {

&#x20;   User.findById(userId, (err, user) => {

&#x20;       if (err) return callback(err);

&#x20;       Appointment.find({ patient: userId }, (err2, appointments) => {

&#x20;           if (err2) return callback(err2);

&#x20;           callback(null, { user, appointments });

&#x20;       });

&#x20;   });

}

4\. Error Handling

javascript

// ✅ CORRECT: Comprehensive error handling

app.post('/appointment', async (req, res) => {

&#x20;   const { doctorId, patientName, symptoms } = req.body;



&#x20;   // Input validation

&#x20;   if (!doctorId || !patientName || !symptoms) {

&#x20;       return res.status(400).json({

&#x20;           success: false,

&#x20;           message: 'Missing required fields',

&#x20;           fields: \['doctorId', 'patientName', 'symptoms']

&#x20;       });

&#x20;   }



&#x20;   try {

&#x20;       const doctor = await User.findById(doctorId);

&#x20;       if (!doctor || doctor.role !== 'doctor') {

&#x20;           return res.status(404).json({

&#x20;               success: false,

&#x20;               message: 'Doctor not found'

&#x20;           });

&#x20;       }



&#x20;       const appointment = new Appointment({

&#x20;           patientName,

&#x20;           symptoms,

&#x20;           doctor: doctorId,

&#x20;           patient: req.user.\_id

&#x20;       });



&#x20;       await appointment.save();



&#x20;       res.status(201).json({

&#x20;           success: true,

&#x20;           data: appointment

&#x20;       });

&#x20;   } catch (error) {

&#x20;       logger.error('Appointment creation failed', {

&#x20;           error: error.message,

&#x20;           userId: req.user?.\_id,

&#x20;           doctorId

&#x20;       });

&#x20;       

&#x20;       res.status(500).json({

&#x20;           success: false,

&#x20;           message: 'Failed to create appointment'

&#x20;       });

&#x20;   }

});



// ❌ INCORRECT: Insufficient error handling

app.post('/appointment', async (req, res) => {

&#x20;   try {

&#x20;       // No validation

&#x20;       const appointment = new Appointment(req.body);

&#x20;       await appointment.save();

&#x20;       res.json(appointment);

&#x20;   } catch (error) {

&#x20;       res.status(500).send('Error'); // Generic error

&#x20;   }

});

5\. Module Organization

javascript

// ✅ CORRECT: Organized imports

// Third-party imports

const express = require('express');

const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');



// Local imports

const User = require('../models/User');

const Appointment = require('../models/Appointment');

const { validateEmail } = require('../utils/validators');



// ✅ CORRECT: Export at bottom

module.exports = router;



// ✅ CORRECT: Named exports

const helpers = {

&#x20;   formatDate,

&#x20;   validatePhone,

&#x20;   generateToken

};



module.exports = helpers;

🎨 CSS Architecture Guidelines

1\. BEM Naming Convention

css

/\* ✅ CORRECT: BEM naming \*/

.medical-card {}

.medical-card\_\_header {}

.medical-card\_\_header--expanded {}

.medical-card\_\_body {}

.medical-card\_\_body--highlighted {}

.medical-card\_\_footer {}



/\* ❌ INCORRECT: Inconsistent naming \*/

.medicalCard {}

.medical-card-header {}

.medCardHead {}

2\. CSS Organization

css

/\* ✅ CORRECT: Organized structure \*/

/\* ============================================

&#x20;  RESET \& BASE

&#x20;  ============================================ \*/



/\* ============================================

&#x20;  LAYOUT \& GRID

&#x20;  ============================================ \*/



/\* ============================================

&#x20;  COMPONENTS

&#x20;  ============================================ \*/



/\* ============================================

&#x20;  STATES \& RESPONSIVE

&#x20;  ============================================ \*/

3\. Responsive Design Approach

css

/\* ✅ CORRECT: Mobile-first approach \*/

.patient-card {

&#x20;   width: 100%;

&#x20;   padding: 12px;

&#x20;   margin-bottom: 12px;

}



@media (min-width: 768px) {

&#x20;   .patient-card {

&#x20;       width: 50%;

&#x20;       padding: 16px;

&#x20;       margin-bottom: 16px;

&#x20;   }

}



@media (min-width: 1024px) {

&#x20;   .patient-card {

&#x20;       width: 33.33%;

&#x20;       padding: 20px;

&#x20;       margin-bottom: 20px;

&#x20;   }

}

4\. CSS Variables Usage

css

/\* ✅ CORRECT: CSS variables for theming \*/

:root {

&#x20;   --primary-color: #00d2ff;

&#x20;   --primary-dark: #00b8e6;

&#x20;   --secondary-color: #928dab;

&#x20;   --bg-dark: #0f0c29;

&#x20;   --bg-medium: #302b63;

&#x20;   --text-light: #e0e0e0;

&#x20;   --text-muted: #a0a0b0;

&#x20;   --shadow-color: rgba(0, 0, 0, 0.3);

}



/\* Using variables \*/

.dashboard-card {

&#x20;   background: var(--bg-medium);

&#x20;   color: var(--text-light);

&#x20;   box-shadow: 0 4px 12px var(--shadow-color);

}



.dashboard-card\_\_title {

&#x20;   color: var(--primary-color);

}

📄 EJS Template Conventions

1\. Template Structure

html

<!-- ✅ CORRECT: Clean template organization -->

<!DOCTYPE html>

<html lang="en">

<head>

&#x20;   <meta charset="UTF-8">

&#x20;   <meta name="viewport" content="width=device-width, initial-scale=1.0">

&#x20;   <title><%= pageTitle %> | Aarogya</title>

&#x20;   <link rel="stylesheet" href="/css/styles.css">

&#x20;   <%- include('partials/head', { meta: metaData }) %>

</head>

<body>

&#x20;   <%- include('partials/navbar', { user: user }) %>

&#x20;   

&#x20;   <main class="container">

&#x20;       <%- content %>

&#x20;   </main>

&#x20;   

&#x20;   <%- include('partials/footer') %>

&#x20;   <script src="/js/scripts.js"></script>

</body>

</html>

2\. Logic in Templates

html

<!-- ✅ CORRECT: Keep logic minimal -->

<% if (user.role === 'patient') { %>

&#x20;   <div class="patient-dashboard">

&#x20;       <h2>Welcome, <%= user.name %></h2>

&#x20;       <a href="/doctors" class="btn">Find Doctors</a>

&#x20;   </div>

<% } else if (user.role === 'doctor') { %>

&#x20;   <div class="doctor-dashboard">

&#x20;       <h2>Welcome, Dr. <%= user.name %></h2>

&#x20;       <a href="/appointments" class="btn">View Appointments</a>

&#x20;   </div>

<% } %>



<!-- ❌ INCORRECT: Complex logic in templates -->

<% 

&#x20;   // Don't put complex business logic in templates

&#x20;   const appointments = await Appointment.find({ doctor: user.id });

&#x20;   const pending = appointments.filter(a => a.status === 'pending');

&#x20;   const total = pending.length;

&#x20;   const message = total > 5 ? 'You have many pending' : 'You have few pending';

%>

3\. Partial Reuse

html

<!-- ✅ CORRECT: Using partials -->

<%- include('partials/card', { 

&#x20;   title: 'Appointment Details',

&#x20;   content: appointment,

&#x20;   classes: 'appointment-card'

}) %>



<!-- ✅ CORRECT: Reusable card partial -->

<!-- partials/card.ejs -->

<div class="card <%= classes %>">

&#x20;   <div class="card\_\_header">

&#x20;       <h3><%= title %></h3>

&#x20;   </div>

&#x20;   <div class="card\_\_body">

&#x20;       <%- content %>

&#x20;   </div>

</div>

🌿 Version Control Standards

1\. Branch Naming

bash

\# ✅ CORRECT: Clear branch naming

feature/patient-appointment-booking

fix/email-validation-error

docs/deployment-guide

refactor/database-optimization

chore/update-dependencies



\# ❌ INCORRECT: Unclear branch names

testing123

fixes

newstuff

2\. Commit Message Format

bash

\# ✅ CORRECT: Conventional commit format

<type>(<scope>): <subject>



\# Example

feat(appointment): add same-day cancellation option



\- Implement cancel endpoint with time check

\- Send notification on cancellation

\- Update appointment status

\- Add cancellation reason field



Closes #87



\# ❌ INCORRECT: Vague commit messages

updated code

fixes

changes

3\. Commit Types Reference

Type	When to Use	Example

feat	New feature	feat(auth): implement OAuth login

fix	Bug fix	fix(booking): correct date format

docs	Documentation	docs(api): update endpoints

style	Code style	style(login): format CSS

refactor	Refactoring	refactor(user): optimize queries

test	Testing	test(api): add unit tests

chore	Maintenance	chore(deps): update mongoose

🧪 Testing Framework

1\. Test Organization

javascript

// tests/unit/user.model.test.js

const User = require('../../models/User');



describe('User Model', () => {

&#x20;   describe('User Creation', () => {

&#x20;       test('should create valid user', async () => {

&#x20;           const userData = {

&#x20;               name: 'Test User',

&#x20;               email: 'test@example.com',

&#x20;               password: 'SecurePass123',

&#x20;               role: 'patient'

&#x20;           };

&#x20;           

&#x20;           const user = new User(userData);

&#x20;           expect(user.name).toBe(userData.name);

&#x20;           expect(user.email).toBe(userData.email);

&#x20;       });



&#x20;       test('should reject invalid email', async () => {

&#x20;           const userData = {

&#x20;               name: 'Test User',

&#x20;               email: 'invalid-email',

&#x20;               password: 'SecurePass123',

&#x20;               role: 'patient'

&#x20;           };

&#x20;           

&#x20;           const user = new User(userData);

&#x20;           await expect(user.validate()).rejects.toThrow();

&#x20;       });

&#x20;   });



&#x20;   describe('Password Hashing', () => {

&#x20;       test('should hash password before save', async () => {

&#x20;           const user = new User({

&#x20;               name: 'Test User',

&#x20;               email: 'test@example.com',

&#x20;               password: 'SecurePass123',

&#x20;               role: 'patient'

&#x20;           });

&#x20;           

&#x20;           await user.save();

&#x20;           expect(user.password).not.toBe('SecurePass123');

&#x20;       });

&#x20;   });

});

2\. Test Naming

javascript

// ✅ CORRECT: Descriptive test names

test('should return user when valid ID provided', () => { ... });

test('should throw error when user not found', () => { ... });

test('should hash password correctly', () => { ... });



// ❌ INCORRECT: Vague test names

test('test user', () => { ... });

test('test error', () => { ... });

test('test hash', () => { ... });

3\. Integration Test Example

javascript

// tests/integration/auth.test.js

const request = require('supertest');

const app = require('../../server');



describe('Authentication API', () => {

&#x20;   describe('POST /login', () => {

&#x20;       test('should login valid user', async () => {

&#x20;           const response = await request(app)

&#x20;               .post('/login')

&#x20;               .send({

&#x20;                   email: 'test@example.com',

&#x20;                   password: 'SecurePass123'

&#x20;               });



&#x20;           expect(response.status).toBe(200);

&#x20;           expect(response.body.success).toBe(true);

&#x20;           expect(response.body.data.token).toBeDefined();

&#x20;       });



&#x20;       test('should reject invalid password', async () => {

&#x20;           const response = await request(app)

&#x20;               .post('/login')

&#x20;               .send({

&#x20;                   email: 'test@example.com',

&#x20;                   password: 'wrongpassword'

&#x20;               });



&#x20;           expect(response.status).toBe(401);

&#x20;           expect(response.body.success).toBe(false);

&#x20;       });

&#x20;   });

});

📚 Documentation Requirements

1\. JSDoc Format

javascript

/\*\*

&#x20;\* Creates a new appointment for a patient

&#x20;\* 

&#x20;\* @async

&#x20;\* @function createAppointment

&#x20;\* @param {string} patientId - ID of the patient

&#x20;\* @param {string} doctorId - ID of the doctor

&#x20;\* @param {Object} appointmentData - Appointment details

&#x20;\* @param {string} appointmentData.patientName - Patient's full name

&#x20;\* @param {string} appointmentData.symptoms - Description of symptoms

&#x20;\* @param {Date} appointmentData.date - Desired appointment date

&#x20;\* @returns {Promise<Object>} Created appointment document

&#x20;\* @throws {Error} If doctor not found or validation fails

&#x20;\* 

&#x20;\* @example

&#x20;\* const appointment = await createAppointment(

&#x20;\*     '507f1f77bcf86cd799439011',

&#x20;\*     '507f1f77bcf86cd799439012',

&#x20;\*     {

&#x20;\*         patientName: 'John Doe',

&#x20;\*         symptoms: 'Persistent cough',

&#x20;\*         date: new Date('2024-12-01')

&#x20;\*     }

&#x20;\* );

&#x20;\*/

async function createAppointment(patientId, doctorId, appointmentData) {

&#x20;   // Implementation

}

2\. Inline Comments

javascript

// ✅ CORRECT: Explain WHY, not WHAT

// Check if appointment time is within business hours

if (appointmentHour < 9 || appointmentHour > 17) {

&#x20;   throw new Error('Appointments only available 9 AM - 5 PM');

}



// ❌ INCORRECT: Stating the obvious

// Set hour to 9

let hour = 9;

3\. README Structure

markdown

\# Project Name



\## 📋 Description

Brief description of the project



\## 🚀 Quick Start

Installation and setup instructions



\## 📁 Project Structure

Overview of the codebase



\## 🔧 Configuration

Environment setup guide



\## 🧪 Testing

How to run tests



\## 📚 Documentation

Links to detailed docs



\## 🤝 Contributing

Contribution guidelines



\## 📄 License

License information

✅ Quality Assurance Checklist

Before Commit

Code passes ESLint rules



No console.log statements



No commented-out code



All tests pass locally



Code follows naming conventions



Error handling implemented



Input validation added



Before PR

Self-review completed



Tests added for new features



Documentation updated



Performance considered



Security reviewed



Code coverage meets threshold



During Review

Code is readable and maintainable



Logic is correct and efficient



Edge cases are handled



Error messages are meaningful



No security vulnerabilities



Performance is acceptable



\~ BY Team AAROGYA

