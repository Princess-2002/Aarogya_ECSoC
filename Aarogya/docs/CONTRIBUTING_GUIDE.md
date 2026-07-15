\# 🤝 Aarogya - Contribution Guidelines



Welcome to Aarogya! We're thrilled to have you join our community of contributors. This guide will help you understand how to contribute effectively and make your experience smooth and enjoyable.



\## 📋 Table of Contents

\- \[Our Commitment](#our-commitment)

\- \[Getting Started](#getting-started)

\- \[Contribution Process](#contribution-process)

\- \[Branch Naming](#branch-naming)

\- \[Commit Messages](#commit-messages)

\- \[Pull Request Process](#pull-request-process)

\- \[Code Review Standards](#code-review-standards)

\- \[Coding Conventions](#coding-conventions)

\- \[Testing Guidelines](#testing-guidelines)

\- \[Issue Reporting](#issue-reporting)

\- \[Community Support](#community-support)



\---



\## 💚 Our Commitment



We are dedicated to creating an open and inclusive environment where everyone feels welcome to contribute. We value:



\- \*\*Respect\*\*: Treat everyone with kindness and professionalism

\- \*\*Collaboration\*\*: Work together to build something amazing

\- \*\*Quality\*\*: Strive for excellence in everything we do

\- \*\*Innovation\*\*: Embrace new ideas and approaches



\---



\## 🚀 Getting Started



\### Prerequisites Checklist

\- \[ ] Node.js v18 or higher installed

\- \[ ] MongoDB Atlas account (free tier works)

\- \[ ] Git installed on your system

\- \[ ] A code editor (VS Code recommended)

\- \[ ] Basic knowledge of JavaScript, Node.js, Express.js



\### First-Time Setup Guide



```bash

\# Step 1: Fork the repository

\# Click the "Fork" button on GitHub to create your copy



\# Step 2: Clone your fork

git clone https://github.com/your-username/Aarogya.git

cd Aarogya



\# Step 3: Add upstream remote

git remote add upstream https://github.com/Princess-2002/Aarogya.git



\# Step 4: Verify remotes

git remote -v



\# Step 5: Install dependencies

npm install



\# Step 6: Set up environment

cp .env.example .env

\# Edit .env with your credentials



\# Step 7: Verify setup

npm run dev

\# Visit http://localhost:5000


🔄 Contribution Process

1️⃣ Find an Issue to Work On

bash

\# Browse available issues

\# Visit: https://github.com/Princess-2002/Aarogya/issues



\# Look for these labels:

\# - "good-first-issue" - Perfect for beginners

\# - "help-wanted" - Need assistance

\# - "bug" - Bug fixes

\# - "enhancement" - New features



\# Comment on the issue to express interest

\# Wait for maintainers to assign it to you

2️⃣ Create a Feature Branch

bash

\# Always branch from 'develop' branch

git checkout develop

git pull upstream develop



\# Create your feature branch

git checkout -b feature/your-feature-name

3️⃣ Write Your Code

bash

\# Make your changes

\# Write clean, well-documented code



\# Stage your changes

git add .



\# Commit with proper message

git commit -m "feat(scope): description of changes"



\# Push to your fork

git push origin feature/your-feature-name

4️⃣ Open a Pull Request

bash

\# Go to your fork on GitHub

\# Click "New Pull Request"

\# Select base: develop, compare: your-branch

\# Fill out the PR template

\# Submit for review

🌿 Branch Naming Convention

Format: type/descriptive-name

Type	Usage	Examples

feature/	New features	feature/patient-registration

fix/	Bug fixes	fix/login-error-handling

docs/	Documentation	docs/update-readme

refactor/	Code improvements	refactor/database-queries

test/	Test additions	test/appointment-api

chore/	Maintenance	chore/update-dependencies

Branch Name Examples

bash

\# Good examples

feature/appointment-booking-system

fix/resolve-authentication-timeout

docs/add-contributing-guide

refactor/optimize-dashboard-queries



\# Bad examples

my-fix              # ❌ No type prefix

feature/           # ❌ Incomplete name

new\_feature        # ❌ Wrong format

✍️ Commit Message Guidelines

Structure

text

<type>(<scope>): <subject>



<body>



<footer>

Commit Types

Type	Description	Example

feat	New feature	feat(auth): implement password reset

fix	Bug fix	fix(booking): correct date validation

docs	Documentation	docs(api): update endpoint documentation

style	Code style	style(login): improve CSS formatting

refactor	Code refactoring	refactor(user): optimize database queries

test	Adding tests	test(appointment): add unit tests

chore	Maintenance	chore(deps): update mongoose

Perfect Commit Examples

bash

\# Simple commit

git commit -m "feat(auth): add JWT authentication"



\# Detailed commit with body

git commit -m "feat(appointment): implement booking cancellation



\- Add cancel endpoint for appointments

\- Implement notification on cancellation

\- Update appointment status to 'Cancelled'

\- Add cancellation reason field



Closes #42"

📥 Pull Request Process

PR Title Format

\[Type] Short description of changes



PR Checklist Before Submission

Tests added or updated



Documentation updated



Self-review completed



No debugging code (console.log, debugger)



No commented-out code



Follows coding standards



Linked to related issue



PR Template to Fill

markdown

\### What does this PR accomplish?



\### Why are these changes needed?



\### How was this tested?



\### Screenshots (if UI changes)



\### Related Issues

Closes #(issue-number)



\### Additional Notes

👀 Code Review Standards

For Reviewers

✅ Check code functionality



✅ Verify test coverage



✅ Review code style



✅ Provide constructive feedback



✅ Be respectful and helpful



For Contributors

✅ Respond to comments promptly



✅ Make requested changes



✅ Explain design decisions



✅ Be open to suggestions



Review Checklist

Code follows style guide



Tests are adequate



Documentation updated



No security vulnerabilities



Performance considered



📝 Coding Conventions

JavaScript/Node.js

javascript

// ✅ Use ES6+ features

const express = require('express');

const app = express();



// ✅ Use const for values that don't change

const PORT = process.env.PORT || 5000;



// ✅ Use let for values that change

let userCount = 0;



// ❌ Avoid var

// var userCount = 0;  // Don't use this



// ✅ Use async/await for promises

async function getUser(id) {

&#x20;   try {

&#x20;       return await User.findById(id);

&#x20;   } catch (error) {

&#x20;       console.error('Error fetching user:', error);

&#x20;       throw error;

&#x20;   }

}



// ✅ Use descriptive variable names

// Good

const getUserById = async (userId) => {

&#x20;   const user = await User.findById(userId);

&#x20;   return user;

};



// Bad

const get = async (id) => {

&#x20;   const u = await User.findById(id);

&#x20;   return u;

};

CSS Styling

css

/\* ✅ Use BEM naming convention \*/

.auth-container {}

.auth-container\_\_header {}

.auth-container\_\_button--primary {}



/\* ✅ Use meaningful class names \*/

.error-message {}        /\* Good \*/

.red-text {}            /\* Bad \*/



/\* ✅ Follow mobile-first approach \*/

.container {

&#x20;   width: 100%;

&#x20;   padding: 10px;

}



@media (min-width: 768px) {

&#x20;   .container {

&#x20;       padding: 20px;

&#x20;       max-width: 720px;

&#x20;   }

}

EJS Templates

html

<!-- ✅ Use semantic HTML -->

<header>

&#x20;   <nav class="main-nav">

&#x20;       <ul>

&#x20;           <li><a href="/">Home</a></li>

&#x20;           <li><a href="/dashboard">Dashboard</a></li>

&#x20;       </ul>

&#x20;   </nav>

</header>



<!-- ✅ Use EJS for dynamic content -->

<h1>Welcome, <%= user.name %></h1>

<p>Email: <%= user.email %></p>



<!-- ✅ Use conditionals -->

<% if (user.role === 'doctor') { %>

&#x20;   <a href="/view-appointments">View Appointments</a>

<% } %>

🧪 Testing Guidelines

Testing Framework

We use Jest for testing. Aim for:



Test Type	Target Coverage

Unit Tests	80%+

Integration Tests	All critical paths

API Tests	All endpoints

Unit Test Example

javascript

// tests/unit/user.model.test.js

const User = require('../../models/User');



describe('User Model', () => {

&#x20;   test('should create user with valid data', async () => {

&#x20;       const userData = {

&#x20;           name: 'Test User',

&#x20;           email: 'test@example.com',

&#x20;           password: 'hashedPassword123',

&#x20;           role: 'patient'

&#x20;       };

&#x20;       

&#x20;       const user = new User(userData);

&#x20;       expect(user.name).toBe(userData.name);

&#x20;       expect(user.email).toBe(userData.email);

&#x20;   });

});

Running Tests

bash

\# Run all tests

npm test



\# Run specific test file

npm test -- user.model.test.js



\# Run in watch mode

npm test -- --watch



\# Generate coverage report

npm test -- --coverage

🐛 Reporting Issues

Bug Report Template

markdown

\*\*Describe the Bug\*\*

A clear description of what the bug is.



\*\*Steps to Reproduce\*\*

1\. Go to '...'

2\. Click on '....'

3\. See error



\*\*Expected Behavior\*\*

What you expected to happen.



\*\*Actual Behavior\*\*

What actually happened.



\*\*Screenshots\*\*

If applicable, add screenshots.



\*\*Environment\*\*

\- OS: \[e.g., Windows 11]

\- Browser: \[e.g., Chrome 120]

\- Node Version: \[e.g., 18.15.0]

\- Database: \[e.g., MongoDB Atlas]



\*\*Additional Context\*\*

Any other information that might help.

Feature Request Template

markdown

\*\*Problem Statement\*\*

What problem does this feature solve?



\*\*Proposed Solution\*\*

How should this feature work?



\*\*Alternatives Considered\*\*

What other solutions were considered?



\*\*Additional Context\*\*

Any other information.

🤝 Community Support

Where to Get Help

GitHub Issues: For technical problems



Discord Community: For real-time chat



Email: aarogya-support@health.com



Documentation: Check the Wiki



Resources

Project Wiki



API Documentation



Style Guide



Thank you for contributing to Aarogya! Together, we're building something amazing. 🌟

