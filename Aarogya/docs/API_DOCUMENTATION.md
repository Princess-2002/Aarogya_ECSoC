\# 📚 Aarogya - A NextGen Care API Documentation



\## Authentication Module (`authRoutes.js`)



\### Overview

The Authentication Module serves as the gateway to the Aarogya platform, managing secure user registration and authentication. It implements industry-standard security practices including bcrypt password hashing and JWT-based session management, ensuring that patient and doctor data remains protected throughout the healthcare ecosystem.



\---



\## 🔐 Authentication Endpoints



\### 1. User Registration (Create Account)

Establishes a new user identity within the Aarogya ecosystem, creating either a patient or healthcare provider profile.



\#### Endpoint Specifications

| Property | Value |

|----------|-------|

| \*\*Endpoint URL\*\* | `/api/auth/signup` |

| \*\*HTTP Method\*\* | `POST` |

| \*\*Authentication Required\*\* | ❌ No |

| \*\*Content-Type\*\* | `application/json` or `application/x-www-form-urlencoded` |



\#### Request Parameters

| Parameter | Type | Required | Description | Validation Rules |

|-----------|------|----------|-------------|------------------|

| `name` | String | ✅ Yes | Complete legal name of the user | 2-100 characters, alphabets and spaces only |

| `email` | String | ✅ Yes | Primary email address for communication | Must be valid email format, unique in system |

| `password` | String | ✅ Yes | Account security credential | Minimum 8 characters, include uppercase, lowercase, number |

| `role` | String | ✅ Yes | User classification within system | Must be `"patient"` or `"doctor"` |



\#### Request Examples



\*\*📝 HTML Form Submission:\*\*

```html

<form method="POST" action="/api/auth/signup" enctype="application/x-www-form-urlencoded">

&#x20;   <div class="form-group">

&#x20;       <label for="name">Full Name</label>

&#x20;       <input type="text" id="name" name="name" placeholder="Dr. Jane Smith" required>

&#x20;   </div>

&#x20;   <div class="form-group">

&#x20;       <label for="email">Email Address</label>

&#x20;       <input type="email" id="email" name="email" placeholder="jane.smith@hospital.com" required>

&#x20;   </div>

&#x20;   <div class="form-group">

&#x20;       <label for="password">Password</label>

&#x20;       <input type="password" id="password" name="password" placeholder="Create strong password" required>

&#x20;   </div>

&#x20;   <div class="form-group">

&#x20;       <label for="role">Register As</label>

&#x20;       <select id="role" name="role" required>

&#x20;           <option value="patient">Patient - Seeking Care</option>

&#x20;           <option value="doctor">Doctor - Healthcare Provider</option>

&#x20;       </select>

&#x20;   </div>

&#x20;   <button type="submit" class="btn btn-primary">Create Account</button>

</form>

```



\*\*💻 JSON API Request:\*\*

```json

POST /api/auth/signup

Content-Type: application/json



{

&#x20;   "name": "Dr. Sarah Johnson",

&#x20;   "email": "sarah.johnson@medical.org",

&#x20;   "password": "Secure@Health2024",

&#x20;   "role": "doctor"

}

```



\*\*🔧 cURL Command:\*\*

```bash

curl -X POST https://aarogya-health.com/api/auth/signup \\

&#x20; -H "Content-Type: application/json" \\

&#x20; -d '{

&#x20;   "name": "Dr. Sarah Johnson",

&#x20;   "email": "sarah.johnson@medical.org",

&#x20;   "password": "Secure@Health2024",

&#x20;   "role": "doctor"

&#x20; }'

```



\#### Response Scenarios



\*\*✅ Registration Successful:\*\*

```

HTTP/1.1 302 Found

Location: /login

Set-Cookie: session=authenticated; HttpOnly; Secure



Response Body: (Redirects to login page)

```



\*\*⚠️ User Already Exists:\*\*

```

HTTP/1.1 200 OK

Content-Type: text/plain



User already exists. Please login.

```



\*\*❌ Server Processing Error:\*\*

```

HTTP/1.1 500 Internal Server Error

Content-Type: text/plain



Error signing up. Try again.

```



\#### Registration Flow Diagram

```

┌─────────────────────────────────────────────────────────────┐

│                    User Registration Process                │

└─────────────────────────────────────────────────────────────┘

&#x20;                            │

&#x20;                            ▼

&#x20;               ┌─────────────────────────┐

&#x20;               │   Submit Registration    │

&#x20;               │   Form Data              │

&#x20;               └────────────┬────────────┘

&#x20;                            │

&#x20;                            ▼

&#x20;               ┌─────────────────────────┐

&#x20;               │   Check Email Uniqueness│

&#x20;               │   in Database           │

&#x20;               └────────────┬────────────┘

&#x20;                            │

&#x20;               ┌────────────┴────────────┐

&#x20;               │                         │

&#x20;               ▼                         ▼

&#x20;   ┌───────────────────┐     ┌───────────────────┐

&#x20;   │   Email Exists    │     │  Email Available  │

&#x20;   │   └─► Return      │     │  └─► Continue     │

&#x20;   │       Error       │     │                   │

&#x20;   └───────────────────┘     └────────┬──────────┘

&#x20;                                      │

&#x20;                                      ▼

&#x20;                        ┌─────────────────────────┐

&#x20;                        │   Hash Password with    │

&#x20;                        │   bcrypt (10 rounds)    │

&#x20;                        └────────────┬────────────┘

&#x20;                                     │

&#x20;                                     ▼

&#x20;                        ┌─────────────────────────┐

&#x20;                        │   Save User Document    │

&#x20;                        │   in MongoDB Atlas      │

&#x20;                        └────────────┬────────────┘

&#x20;                                     │

&#x20;                                     ▼

&#x20;                        ┌─────────────────────────┐

&#x20;                        │   Redirect to Login     │

&#x20;                        │   Page                  │

&#x20;                        └─────────────────────────┘

```



\---



\### 2. User Authentication (Sign In)

Verifies user credentials and establishes a secure session through JWT token generation.



\#### Endpoint Specifications

| Property | Value |

|----------|-------|

| \*\*Endpoint URL\*\* | `/api/auth/login` |

| \*\*HTTP Method\*\* | `POST` |

| \*\*Authentication Required\*\* | ❌ No |

| \*\*Content-Type\*\* | `application/json` or `application/x-www-form-urlencoded` |



\#### Request Parameters

| Parameter | Type | Required | Description |

|-----------|------|----------|-------------|

| `email` | String | ✅ Yes | Registered email address associated with the account |

| `password` | String | ✅ Yes | Account password for verification |



\#### Request Examples



\*\*📝 HTML Form Submission:\*\*

```html

<form method="POST" action="/api/auth/login">

&#x20;   <div class="form-group">

&#x20;       <label for="email">Email</label>

&#x20;       <input type="email" id="email" name="email" placeholder="your@email.com" required>

&#x20;   </div>

&#x20;   <div class="form-group">

&#x20;       <label for="password">Password</label>

&#x20;       <input type="password" id="password" name="password" placeholder="Enter password" required>

&#x20;   </div>

&#x20;   <button type="submit" class="btn btn-success">Sign In</button>

</form>

```



\*\*💻 JSON API Request:\*\*

```json

POST /api/auth/login

Content-Type: application/json



{

&#x20;   "email": "sarah.johnson@medical.org",

&#x20;   "password": "Secure@Health2024"

}

```



\*\*🔧 cURL Command:\*\*

```bash

curl -X POST https://aarogya-health.com/api/auth/login \\

&#x20; -H "Content-Type: application/json" \\

&#x20; -d '{

&#x20;   "email": "sarah.johnson@medical.org",

&#x20;   "password": "Secure@Health2024"

&#x20; }' \\

&#x20; -c cookies.txt

```



\#### Response Scenarios



\*\*✅ Authentication Successful:\*\*

```

HTTP/1.1 200 OK

Content-Type: text/plain

Set-Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...; HttpOnly; Secure; Max-Age=3600



Login successful! Welcome, doctor

```



\*\*❌ Account Not Found:\*\*

```

HTTP/1.1 200 OK

Content-Type: text/plain



No account found. Please sign up first.

```



\*\*❌ Invalid Credentials:\*\*

```

HTTP/1.1 200 OK

Content-Type: text/plain



Incorrect password. Try again.

```



\*\*❌ System Error:\*\*

```

HTTP/1.1 500 Internal Server Error

Content-Type: text/plain



Error logging in. Try again.

```



\#### JWT Token Structure

| Component | Description | Example |

|-----------|-------------|---------|

| \*\*Header\*\* | Algorithm and token type | `{"alg": "HS256", "typ": "JWT"}` |

| \*\*Payload\*\* | User identification data | `{"id": "507f1f77bcf86cd799439011", "role": "doctor"}` |

| \*\*Signature\*\* | HMAC-SHA256 signature | `\[hashed\_signature]` |



\#### Authentication Flow

```

┌─────────────────────────────────────────────────────────────┐

│                     User Login Process                     │

└─────────────────────────────────────────────────────────────┘

&#x20;                            │

&#x20;                            ▼

&#x20;               ┌─────────────────────────┐

&#x20;               │   Submit Login          │

&#x20;               │   Credentials           │

&#x20;               └────────────┬────────────┘

&#x20;                            │

&#x20;                            ▼

&#x20;               ┌─────────────────────────┐

&#x20;               │   Find User by Email    │

&#x20;               │   in Database           │

&#x20;               └────────────┬────────────┘

&#x20;                            │

&#x20;               ┌────────────┴────────────┐

&#x20;               │                         │

&#x20;               ▼                         ▼

&#x20;   ┌───────────────────┐     ┌───────────────────┐

&#x20;   │   User Not Found  │     │  User Found       │

&#x20;   │   └─► Return      │     │  └─► Continue     │

&#x20;   │       Error       │     │                   │

&#x20;   └───────────────────┘     └────────┬──────────┘

&#x20;                                      │

&#x20;                                      ▼

&#x20;                        ┌─────────────────────────┐

&#x20;                        │   Compare Password      │

&#x20;                        │   with bcrypt           │

&#x20;                        └────────────┬────────────┘

&#x20;                                     │

&#x20;                        ┌────────────┴────────────┐

&#x20;                        │                         │

&#x20;                        ▼                         ▼

&#x20;            ┌───────────────────┐     ┌───────────────────┐

&#x20;            │  Password Match   │     │  Password Mismatch│

&#x20;            │  └─► Generate JWT │     │  └─► Return       │

&#x20;            │      Token        │     │      Error        │

&#x20;            └────────┬──────────┘     └───────────────────┘

&#x20;                     │

&#x20;                     ▼

&#x20;        ┌─────────────────────────────┐

&#x20;        │   Set JWT as HTTP-Only      │

&#x20;        │   Cookie for Persistence    │

&#x20;        └────────────┬────────────────┘

&#x20;                     │

&#x20;                     ▼

&#x20;        ┌─────────────────────────────┐

&#x20;        │   Return Success Response   │

&#x20;        │   with User Role            │

&#x20;        └─────────────────────────────┘

```



\---



\## 🛡️ Dashboard Access Routes (`dashboard.js`)



\### Overview

The Dashboard Module provides role-specific interfaces for patients and doctors, protected by a robust authentication middleware that validates JWT tokens before granting access.



\### Authentication Middleware: `requireAuth`



\#### Function Purpose

Acts as a gatekeeper for all protected routes, ensuring only authenticated users with valid sessions can access sensitive healthcare data.



\#### Middleware Execution Flow

```

┌─────────────────────────────────────────────────────────────┐

│                 Authentication Middleware                   │

└─────────────────────────────────────────────────────────────┘

&#x20;                            │

&#x20;                            ▼

&#x20;               ┌─────────────────────────┐

&#x20;               │   Extract JWT Token     │

&#x20;               │   from Cookie           │

&#x20;               └────────────┬────────────┘

&#x20;                            │

&#x20;               ┌────────────┴────────────┐

&#x20;               │                         │

&#x20;               ▼                         ▼

&#x20;   ┌───────────────────┐     ┌───────────────────┐

&#x20;   │   No Token Found  │     │  Token Present    │

&#x20;   │   └─► Redirect    │     │  └─► Verify       │

&#x20;   │       to /login   │     │      Token        │

&#x20;   └───────────────────┘     └────────┬──────────┘

&#x20;                                      │

&#x20;                                      ▼

&#x20;                        ┌─────────────────────────┐

&#x20;                        │   Verify JWT with       │

&#x20;                        │   Secret Key            │

&#x20;                        └────────────┬────────────┘

&#x20;                                     │

&#x20;                        ┌────────────┴────────────┐

&#x20;                        │                         │

&#x20;                        ▼                         ▼

&#x20;            ┌───────────────────┐     ┌───────────────────┐

&#x20;            │  Invalid Token    │     │  Valid Token      │

&#x20;            │  └─► Redirect     │     │  └─► Fetch        │

&#x20;            │      to /login    │     │      User         │

&#x20;            └───────────────────┘     └────────┬──────────┘

&#x20;                                              │

&#x20;                                              ▼

&#x20;                                ┌─────────────────────────┐

&#x20;                                │   Attach User Object    │

&#x20;                                │   to Request            │

&#x20;                                └────────────┬────────────┘

&#x20;                                             │

&#x20;                                             ▼

&#x20;                                ┌─────────────────────────┐

&#x20;                                │   Proceed to Next       │

&#x20;                                │   Middleware/Route      │

&#x20;                                └─────────────────────────┘

```



\---



\### 1. Patient Dashboard

Personalized interface for patients to manage their health journey, view appointments, and access medical records.



\#### Endpoint Specifications

| Property | Value |

|----------|-------|

| \*\*Endpoint URL\*\* | `/dashboard/patient-dashboard` |

| \*\*HTTP Method\*\* | `GET` |

| \*\*Authentication Required\*\* | ✅ Yes (Valid JWT Token) |

| \*\*Access Control\*\* | Patients Only |



\#### Request Headers

| Header | Required | Description |

|--------|----------|-------------|

| `Cookie` | ✅ Yes | Must contain valid JWT token in `token` field |



\#### Request Example

```bash

curl -X GET https://aarogya-health.com/dashboard/patient-dashboard \\

&#x20; -H "Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

```



\#### Response Scenarios



\*\*✅ Access Granted:\*\*

```

HTTP/1.1 200 OK

Content-Type: text/html



Renders: patientDashboard.ejs

Data Context: 

&#x20; - user: {

&#x20;     name: "John Doe",

&#x20;     email: "john@email.com",

&#x20;     role: "patient",

&#x20;     appointments: \[...] // Full appointment history

&#x20;   }

```



\*\*❌ Session Expired/Invalid:\*\*

```

HTTP/1.1 302 Found

Location: /login

```



\*\*❌ Unauthorized Access (Wrong Role):\*\*

```

HTTP/1.1 302 Found

Location: /login

```



\#### Dashboard Features

| Feature | Description |

|---------|-------------|

| \*\*Appointment Overview\*\* | View upcoming, past, and pending appointments |

| \*\*Health Records\*\* | Access to medical history and reports |

| \*\*Doctor Search\*\* | Find and book appointments with specialists |

| \*\*AI Health Insights\*\* | View AI-generated health recommendations |

| \*\*Profile Management\*\* | Update personal information and preferences |



\---



\### 2. Doctor Dashboard

Professional interface for healthcare providers to manage consultations, view patient appointments, and track medical practice.



\#### Endpoint Specifications

| Property | Value |

|----------|-------|

| \*\*Endpoint URL\*\* | `/dashboard/doctor-dashboard` |

| \*\*HTTP Method\*\* | `GET` |

| \*\*Authentication Required\*\* | ✅ Yes (Valid JWT Token) |

| \*\*Access Control\*\* | Doctors Only |



\#### Request Headers

| Header | Required | Description |

|--------|----------|-------------|

| `Cookie` | ✅ Yes | Must contain valid JWT token in `token` field |



\#### Request Example

```bash

curl -X GET https://aarogya-health.com/dashboard/doctor-dashboard \\

&#x20; -H "Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

```



\#### Response Scenarios



\*\*✅ Access Granted:\*\*

```

HTTP/1.1 200 OK

Content-Type: text/html



Renders: doctorDashboard.ejs

Data Context: 

&#x20; - user: {

&#x20;     name: "Dr. Sarah Johnson",

&#x20;     email: "sarah@medical.org",

&#x20;     role: "doctor",

&#x20;     specialization: "Cardiology",

&#x20;     experience: "15 years",

&#x20;     appointments: \[...] // Full appointment schedule

&#x20;   }

```



\*\*❌ Session Expired/Invalid:\*\*

```

HTTP/1.1 302 Found

Location: /login

```



\*\*❌ Unauthorized Access (Wrong Role):\*\*

```

HTTP/1.1 302 Found

Location: /login

```



\#### Dashboard Features

| Feature | Description |

|---------|-------------|

| \*\*Appointment Management\*\* | View, accept, or reschedule patient appointments |

| \*\*Patient History\*\* | Access to patient medical records |

| \*\*Availability Management\*\* | Set and update consultation availability |

| \*\*Practice Analytics\*\* | View consultation statistics and trends |

| \*\*AI Diagnostic Support\*\* | Access AI-generated diagnostic insights |



\---



\## 📊 Data Models



\### User Schema (`User.js`)

Comprehensive user profile supporting both patients and healthcare providers.



```javascript

{

&#x20;   name: {

&#x20;       type: String,

&#x20;       required: true,

&#x20;       trim: true

&#x20;   },

&#x20;   email: {

&#x20;       type: String,

&#x20;       required: true,

&#x20;       unique: true,

&#x20;       lowercase: true,

&#x20;       trim: true

&#x20;   },

&#x20;   password: {

&#x20;       type: String,

&#x20;       required: true,

&#x20;       select: false  // Excluded from queries by default

&#x20;   },

&#x20;   role: {

&#x20;       type: String,

&#x20;       enum: \["doctor", "patient"],

&#x20;       required: true,

&#x20;       index: true    // Optimized for role-based queries

&#x20;   },

&#x20;   specialization: {

&#x20;       type: String,

&#x20;       required: function() { return this.role === "doctor"; },

&#x20;       enum: \[

&#x20;           "Cardiology", "Dermatology", "Neurology", 

&#x20;           "Pediatrics", "Orthopedics", "Ophthalmology",

&#x20;           "ENT", "Psychiatry", "Oncology", "General"

&#x20;       ]

&#x20;   },

&#x20;   experience: {

&#x20;       type: String,

&#x20;       required: function() { return this.role === "doctor"; },

&#x20;       validate: {

&#x20;           validator: function(v) {

&#x20;               return /^\\d+(\\s\*-\\s\*\\d+)?\\s\*years?$/.test(v);

&#x20;           },

&#x20;           message: 'Experience must be in format: "5 years" or "5-10 years"'

&#x20;       }

&#x20;   },

&#x20;   bio: {

&#x20;       type: String,

&#x20;       required: function() { return this.role === "doctor"; },

&#x20;       maxlength: 500

&#x20;   },

&#x20;   appointments: \[{

&#x20;       type: mongoose.Schema.Types.ObjectId,

&#x20;       ref: "Appointment"

&#x20;   }],

&#x20;   createdAt: {

&#x20;       type: Date,

&#x20;       default: Date.now,

&#x20;       immutable: true

&#x20;   },

&#x20;   updatedAt: {

&#x20;       type: Date,

&#x20;       default: Date.now

&#x20;   }

}

```



\### Appointment Schema (`Appointment.js`)

Tracks all healthcare appointments between patients and doctors.



```javascript

{

&#x20;   patientName: {

&#x20;       type: String,

&#x20;       required: true,

&#x20;       trim: true,

&#x20;       maxlength: 100

&#x20;   },

&#x20;   patientAge: {

&#x20;       type: Number,

&#x20;       required: true,

&#x20;       min: 0,

&#x20;       max: 150

&#x20;   },

&#x20;   symptoms: {

&#x20;       type: String,

&#x20;       required: true,

&#x20;       trim: true,

&#x20;       maxlength: 1000

&#x20;   },

&#x20;   doctor: {

&#x20;       type: mongoose.Schema.Types.ObjectId,

&#x20;       ref: "User",

&#x20;       required: true,

&#x20;       index: true    // Optimized for doctor lookups

&#x20;   },

&#x20;   patient: {

&#x20;       type: mongoose.Schema.Types.ObjectId,

&#x20;       ref: "User",

&#x20;       required: true,

&#x20;       index: true    // Optimized for patient lookups

&#x20;   },

&#x20;   date: {

&#x20;       type: Date,

&#x20;       required: true,

&#x20;       default: Date.now,

&#x20;       index: true    // Optimized for date-based queries

&#x20;   },

&#x20;   status: {

&#x20;       type: String,

&#x20;       enum: \["Pending", "Confirmed", "Completed", "Cancelled"],

&#x20;       default: "Pending",

&#x20;       index: true    // Optimized for status filtering

&#x20;   },

&#x20;   notes: {

&#x20;       type: String,

&#x20;       maxlength: 500

&#x20;   },

&#x20;   createdAt: {

&#x20;       type: Date,

&#x20;       default: Date.now,

&#x20;       immutable: true

&#x20;   }

}

```



\---



\## 🔐 Security Best Practices



\### Password Security

| Practice | Implementation | Benefit |

|----------|---------------|---------|

| \*\*Bcrypt Hashing\*\* | 10 rounds of salt | Resists brute-force attacks |

| \*\*No Plain Text\*\* | Never stored in DB | Prevents data breach exposure |

| \*\*Minimum Length\*\* | 8+ characters | Increases complexity |

| \*\*Character Requirements\*\* | Uppercase, lowercase, numbers | Enhances password strength |



\### JWT Implementation

| Security Feature | Implementation | Purpose |

|------------------|----------------|---------|

| \*\*HTTP-Only Cookies\*\* | `httpOnly: true` | Prevents XSS attacks |

| \*\*Secure Flag\*\* | `secure: true` (production) | Ensures HTTPS-only transmission |

| \*\*Short Expiration\*\* | 1 hour | Reduces token compromise window |

| \*\*Secret Management\*\* | Environment variables | Keeps secrets out of codebase |



\### Session Management

| Feature | Description |

|---------|-------------|

| \*\*Automatic Expiration\*\* | Tokens expire after 1 hour |

| \*\*Stateless Design\*\* | No server-side session storage needed |

| \*\*Revocation\*\* | Server can invalidate by removing cookie |



\---



\## 🧪 Testing Guide



\### Registration Test

```javascript

describe('POST /api/auth/signup', () => {

&#x20;   test('Should create a new patient account', async () => {

&#x20;       const response = await request(app)

&#x20;           .post('/api/auth/signup')

&#x20;           .send({

&#x20;               name: 'Test Patient',

&#x20;               email: `patient${Date.now()}@test.com`,

&#x20;               password: 'TestPass123!',

&#x20;               role: 'patient'

&#x20;           });

&#x20;       

&#x20;       expect(response.status).toBe(302);

&#x20;       expect(response.headers.location).toBe('/login');

&#x20;   });

});

```



\### Login Test

```javascript

describe('POST /api/auth/login', () => {

&#x20;   test('Should authenticate valid user', async () => {

&#x20;       const response = await request(app)

&#x20;           .post('/api/auth/login')

&#x20;           .send({

&#x20;               email: 'testpatient@test.com',

&#x20;               password: 'TestPass123!'

&#x20;           });

&#x20;       

&#x20;       expect(response.status).toBe(200);

&#x20;       expect(response.text).toContain('Login successful');

&#x20;       expect(response.headers\['set-cookie']).toBeDefined();

&#x20;   });

});

```



\### Dashboard Access Test

```javascript

describe('GET /dashboard/patient-dashboard', () => {

&#x20;   test('Should allow authenticated patient access', async () => {

&#x20;       // First login to get token

&#x20;       const login = await request(app)

&#x20;           .post('/api/auth/login')

&#x20;           .send({

&#x20;               email: 'testpatient@test.com',

&#x20;               password: 'TestPass123!'

&#x20;           });

&#x20;       

&#x20;       const token = login.headers\['set-cookie']\[0].split(';')\[0].split('=')\[1];

&#x20;       

&#x20;       const response = await request(app)

&#x20;           .get('/dashboard/patient-dashboard')

&#x20;           .set('Cookie', `token=${token}`);

&#x20;       

&#x20;       expect(response.status).toBe(200);

&#x20;       expect(response.text).toContain('patientDashboard');

&#x20;   });

});

```



\---



\## 🐛 Common Issues \& Troubleshooting



| Issue | Symptom | Solution |

|-------|---------|----------|

| \*\*Connection Error\*\* | `MongoNetworkError` | Check MongoDB Atlas connection string and IP whitelist |

| \*\*JWT Verification Failed\*\* | 302 redirect to /login | Regenerate token, check secret key consistency |

| \*\*Duplicate Email\*\* | User already exists message | User should use login instead of signup |

| \*\*Role Mismatch\*\* | Redirected to /login | Verify user role matches dashboard type |

| \*\*Missing Cookie\*\* | No token in request | Clear browser cookies and login again |



\---



\## 🚀 API Enhancement Roadmap



\### Phase 1

\- \[x] Basic authentication with JWT

\- \[x] Role-based access control

\- \[x] Password hashing with bcrypt



\### Phase 2

\- \[ ] Refresh token implementation

\- \[ ] Email verification on signup

\- \[ ] Password reset via email link

\- \[ ] Rate limiting for login attempts



\### Phase 3

\- \[ ] OAuth 2.0 integration (Google, Apple Health)

\- \[ ] Two-factor authentication (2FA)

\- \[ ] Session management dashboard

\- \[ ] API key generation for third-party integrations



\### Phase 4 

\- \[ ] Biometric authentication support

\- \[ ] Blockchain-based identity verification

\- \[ ] AI-powered anomaly detection for security

\- \[ ] Compliance audit logging



\---



\## 📞 Support \& Resources



\### Getting Help

\- \*\*Documentation\*\*: \[Aarogya Documentation Hub](https://docs.aarogya-health.com)

\- \*\*API Issues\*\*: \[GitHub Issues](https://github.com/Princess-2002/Aarogya/issues)

\- \*\*Security Concerns\*\*: security@aarogya-health.com

\- \*\*Developer Chat\*\*: Join our \[Discord Community](https://discord.gg/aarogya)



\### Useful Links

\- \[API Status Dashboard](https://status.aarogya-health.com)

\- \[System Architecture Guide](https://docs.aarogya-health.com/architecture)

\- \[Contributor Guidelines](https://docs.aarogya-health.com/contributing)

\- \[Postman Collection](https://www.postman.com/aarogya-api)



\---



\*Documentation Version 2.0 | Last Updated: 2026 | Maintained by Aarogya Development Team\*



\---



> \*"Democratizing healthcare through intelligent technology"\*

