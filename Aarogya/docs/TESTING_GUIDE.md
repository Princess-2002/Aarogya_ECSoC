\# 🧪 Aarogya - Manual Testing Guide



\## 📋 Introduction



This guide provides detailed instructions for manually testing the Aarogya application. Following these testing procedures helps maintain quality standards and catch issues before they reach production.



\---



\## 📑 Table of Contents



\- \[Test Environment Setup](#test-environment-setup)

\- \[Authentication Testing](#authentication-testing)

\- \[Functional Testing](#functional-testing)

\- \[Validation Testing](#validation-testing)

\- \[Dashboard Testing](#dashboard-testing)

\- \[AI Features Testing](#ai-features-testing)

\- \[Browser Compatibility](#browser-compatibility)

\- \[Mobile Testing](#mobile-testing)

\- \[Testing Checklist](#testing-checklist)

\- \[Issue Reporting](#issue-reporting)



\---



\## 🚀 Test Environment Setup



\### Setup Instructions



```bash

\# 1. Clone the repository

git clone https://github.com/Princess-2002/Aarogya.git

cd Aarogya



\# 2. Install dependencies

npm install



\# 3. Configure environment

cp .env.example .env

\# Add test credentials



\# 4. Start the server

npm run dev



\# 5. Open browser

\# Navigate to http://localhost:5000





Test Accounts

Account Type	Email	Password	Role

Patient Test	patient.test@aarogya.com	Test@123	Patient

Doctor Test	doctor.test@aarogya.com	Test@123	Doctor

Invalid User	invalid@aarogya.com	wrongpass	None

🔐 Authentication Testing

Registration Testing

Happy Path - Successful Registration

Step	Action	Expected Result

1	Go to /signup	Signup form loads

2	Enter valid details	All fields accepted

3	Click Sign Up	Redirected to login

4	Check database	User exists in database

Error Paths - Registration Failures

Scenario	Action	Expected Error

Duplicate Email	Register with existing email	"User already exists"

Missing Name	Leave name empty	"Name is required"

Invalid Email	Enter invalid email	"Please enter a valid email"

Short Password	Enter 3 character password	"Password must be at least 6 characters"

No Role	Don't select role	"Please select a role"

Login Testing

Happy Path - Successful Login

Step	Action	Expected Result

1	Go to /login	Login form loads

2	Enter valid credentials	Form accepts input

3	Click Login	Redirected to dashboard

4	Check cookie	JWT token present

Error Paths - Login Failures

Scenario	Action	Expected Error

User Not Found	Login with unregistered email	"No account found"

Wrong Password	Login with incorrect password	"Incorrect password"

Empty Fields	Submit empty form	"Email and password are required"

Invalid Email	Enter invalid format	"Please enter a valid email"

Logout Testing

Step	Action	Expected Result

1	Login successfully	User is logged in

2	Click Logout	Redirected to login

3	Check cookie	Token removed

4	Try protected route	Redirected to login

📋 Functional Testing

Appointment Booking (Patient)

Happy Path - Book Appointment

Step	Action	Expected Result

1	Login as patient	Patient dashboard loads

2	Go to /doctors	Doctor list displays

3	Select a doctor	Doctor profile opens

4	Click Book Appointment	Booking form opens

5	Fill form	All fields accepted

6	Submit	Appointment created

7	Check dashboard	Appointment appears

Error Paths - Booking Failures

Scenario	Action	Expected Error

Empty Name	Leave patient name empty	"Patient name is required"

Short Name	Enter single character	"Name must be at least 2 characters"

Invalid Age	Enter negative age	"Please enter a valid age"

High Age	Enter age > 150	"Please enter a valid age"

Empty Symptoms	Leave symptoms empty	"Symptoms are required"

Short Symptoms	Enter 2 characters	"Symptoms must be at least 3 characters"

View Appointments (Doctor)

Happy Path - View Appointments

Step	Action	Expected Result

1	Login as doctor	Doctor dashboard loads

2	Go to /view-appointments	Appointment list displays

3	View appointment details	Patient info visible

4	Update status	Status changes confirmed

📝 Validation Testing

Form Validation Matrix

Signup Form Validation

Field	Valid	Invalid	Error Message

Name	"John Doe" (2-100 chars)	Empty, 1 char	"Name is required" / "Name must be at least 2 characters"

Email	"user@domain.com"	Invalid format, empty	"Please enter a valid email"

Password	"Secure@123" (6+ chars)	Empty, 3 chars	"Password is required" / "Password must be at least 6 characters"

Role	"patient" or "doctor"	Not selected	"Please select a role"

Login Form Validation

Field	Valid	Invalid	Error Message

Email	"user@domain.com"	Empty, invalid format	"Email is required" / "Please enter a valid email"

Password	"Secure@123"	Empty	"Password is required"

Appointment Form Validation

Field	Valid	Invalid	Error Message

Patient Name	"John Doe" (2-100 chars)	Empty, 1 char	"Patient name is required" / "Name must be at least 2 characters"

Patient Age	0-150	Negative, >150, text	"Please enter a valid age"

Symptoms	3-1000 chars	Empty, 2 chars	"Symptoms are required" / "Symptoms must be at least 3 characters"

📊 Dashboard Testing

Patient Dashboard

Feature	Test Action	Expected Result

Welcome Message	Login as patient	Shows user name

Role Badge	View dashboard	Shows "Patient"

Appointment List	View appointments	Shows appointments

Schedule Button	Click "Schedule"	Navigates to doctors

Quick Actions	Test all links	All work correctly

Doctor Dashboard

Feature	Test Action	Expected Result

Welcome Message	Login as doctor	Shows user name

Role Badge	View dashboard	Shows "Doctor"

View Appointments	Click button	Navigates to appointments

Quick Stats	View dashboard	Stats displayed

Navigation Testing

Link	Expected Destination	Works?

Home	Landing page	✅

Aarogya AI	AI page	✅

Our Team	Team page	✅

Dashboard	Dashboard page	✅

Contact Us	Contact page	✅

Logout	Login page	✅

🤖 AI Features Testing

Chatbot Testing

Open Chatbot

Step	Action	Expected Result

1	Load any page	Chatbot button visible

2	Click chatbot button	Chat window opens

3	Check welcome message	"Hello! I'm your Aarogya AI assistant"

Send Messages

Test Case	Message	Expected Response

Greeting	"Hello"	Greeting response

Health Question	"I have a headache"	Health advice

Wellness	"How to stay healthy?"	Health tips

Farewell	"Bye"	Farewell response

Chatbot Features

Feature	Test Action	Expected Result

Message Input	Type and send	Message appears

AI Response	Wait for reply	Response within 2 seconds

Typing Indicator	Send message	Dots show while typing

Close Chat	Click X	Window closes

Health Analysis Testing

Step	Action	Expected Result

1	Go to Aarogya AI	AI page loads

2	Enter health query	Query accepted

3	Submit	Analysis provided

4	Check response	Appropriate health info

🌐 Browser Compatibility

Supported Browsers

Browser	Minimum Version	Test Status

Google Chrome	90+	✅ Must Pass

Mozilla Firefox	88+	✅ Must Pass

Microsoft Edge	90+	✅ Should Pass

Apple Safari	14+	✅ Should Pass

Opera	76+	✅ Should Pass

Browser Testing Checklist

Feature	Chrome	Firefox	Edge	Safari	Opera

Login	✅	✅	✅	✅	✅

Signup	✅	✅	✅	✅	✅

Dashboard	✅	✅	✅	✅	✅

Chatbot	✅	✅	✅	✅	✅

Forms	✅	✅	✅	✅	✅

Navigation	✅	✅	✅	✅	✅

AI Features	✅	✅	✅	✅	✅

Responsive	✅	✅	✅	✅	✅

📱 Mobile Testing

Supported Devices

Device	Screen Size	Test Status

iPhone 12/13/14	390x844	✅ Must Pass

Samsung Galaxy S21	360x800	✅ Must Pass

Google Pixel 6	412x915	✅ Should Pass

iPad (Tablet)	768x1024	✅ Should Pass

Desktop	1920x1080	✅ Must Pass

Mobile Testing Checklist

Navigation

Hamburger menu works



Menu opens/closes correctly



All links accessible



Menu closes on link click



Forms

Input fields touch-friendly



Keyboard appears appropriately



Submit buttons clickable



Error messages visible



Chatbot

Chat button accessible



Chat window fits screen



Messages readable



Input field accessible



Dashboard

Layout adapts to screen



Content readable



Buttons touch-friendly



No horizontal scroll



✅ Testing Checklist

Pre-Submission Checklist

Authentication Tests

Signup - Valid data



Signup - Duplicate email



Signup - Missing fields



Login - Valid credentials



Login - Invalid credentials



Login - Empty fields



Logout - Works correctly



Protected routes - Require login



CRUD Tests

Create appointment



View appointments



Update appointment status



Cancel appointment



Validation Tests

All forms validate



Error messages clear



Required fields work



Format validation works



Range validation works



Dashboard Tests

Patient dashboard



Doctor dashboard



Navigation links



Data display



AI Tests

Chatbot opens



Chatbot sends messages



Chatbot responds



Health analysis works



Browser Tests

Chrome



Firefox



Edge



Safari



Mobile Tests

iPhone



Android



Tablet



Responsive layout



Feature Test Checklist

Patient Features

Can view doctors list



Can book appointment



Can view appointments



Can cancel appointment



Patient dashboard works



Doctor Features

Can view appointments



Can accept appointment



Can reject appointment



Can view patient details



Doctor dashboard works



🐛 Issue Reporting

Issue Report Template

markdown

\*\*Title:\*\* \[Clear description of issue]



\*\*Severity:\*\* \[Critical/Major/Minor/Trivial]



\*\*Steps to Reproduce:\*\*

1\. Go to '...'

2\. Click on '....'

3\. See error



\*\*Expected Behavior:\*\*

What should happen



\*\*Actual Behavior:\*\*

What actually happens



\*\*Screenshots/Video:\*\*

\[Attach if applicable]



\*\*Environment:\*\*

\- OS: \[e.g., Windows 11]

\- Browser: \[e.g., Chrome 120]

\- Device: \[e.g., iPhone 13]

\- Screen Size: \[e.g., 390x844]

\- App Version: \[e.g., v1.0.0]



\*\*Additional Information:\*\*

\[Any other relevant details]

Issue Severity Guide

Severity	Description	Response Time

Critical	Feature broken, no workaround	Immediate (4 hours)

Major	Feature broken, has workaround	24 hours

Minor	UI issue, functionality works	72 hours

Trivial	Cosmetic issue	1 week

📊 Test Report

Report Template

markdown

\# Test Report - Aarogya



\## Test Information

\- \*\*Date:\*\* \[YYYY-MM-DD]

\- \*\*Tester:\*\* \[Name]

\- \*\*Environment:\*\* \[Local/Staging/Production]

\- \*\*Version:\*\* \[Version]



\## Test Summary



| Component | Status | Notes |

|-----------|--------|-------|

| Authentication | ✅ Pass | All tests passed |

| CRUD Operations | ✅ Pass | All tests passed |

| Form Validation | ✅ Pass | All tests passed |

| Dashboard | ✅ Pass | All tests passed |

| AI Features | ✅ Pass | All tests passed |

| Browser Compatibility | ✅ Pass | All browsers tested |

| Mobile Responsiveness | ✅ Pass | All devices tested |



\## Issues Found



\### Critical Issues

None found



\### Major Issues

None found



\### Minor Issues

None found



\### Trivial Issues

None found



\## Recommendations

\- \[ ] Continue with current implementation

\- \[ ] No critical issues blocking release



\## Sign-off

\- \[ ] QA Approval

\- \[ ] Product Owner Approval



\*\*Signature:\*\* \[Name] \[Date]

📚 Additional Resources

Testing Tools

Browser DevTools (F12)



Chrome Lighthouse - Performance



Postman - API Testing



MongoDB Compass - Database



Helpful Links

Project Repository



Issue Tracker



Documentation





"Democratizing healthcare through intelligent technology"





