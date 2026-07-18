\# ⚙️ Aarogya - Configuration Reference Guide



\## 📋 Introduction



This document provides a comprehensive reference for all configuration options available in the Aarogya application. It covers environment variables, server settings, database options, security configurations, and more. Use this guide to understand and modify the application's behavior.



\---



\## 📑 Table of Contents



\- \[Environment Variables Reference](#environment-variables-reference)

\- \[Server Configuration](#server-configuration)

\- \[Database Configuration](#database-configuration)

\- \[Authentication Configuration](#authentication-configuration)

\- \[Security Configuration](#security-configuration)

\- \[AI \& External Services](#ai--external-services)

\- \[Email Configuration](#email-configuration)

\- \[Static Assets \& Uploads](#static-assets--uploads)

\- \[Configuration Best Practices](#configuration-best-practices)



\---



\## 🔧 Environment Variables Reference



\### Required Environment Variables



| Variable | Description | Default | Example |

|----------|-------------|---------|---------|

| `NODE\_ENV` | Application environment | `development` | `production` |

| `PORT` | Server port | `5000` | `3000` |

| `MONGO\_URL` | MongoDB connection string | None | `mongodb+srv://...` |

| `JWT\_SECRET` | JWT signing secret | None | `your-32-character-secret` |

| `OPENAI\_API\_KEY` | OpenAI API key | None | `sk-proj-...` |



\### Optional Environment Variables



| Variable | Description | Default | Example |

|----------|-------------|---------|---------|

| `CLIENT\_URL` | CORS allowed origin | `\*` | `https://aarogya-health.com` |

| `COOKIE\_SECRET` | Cookie encryption | None | `your-cookie-secret` |

| `LOG\_LEVEL` | Logging level | `info` | `debug` |

| `RATE\_LIMIT\_WINDOW` | Rate limit window (ms) | `60000` | `30000` |

| `RATE\_LIMIT\_MAX` | Max requests per window | `100` | `50` |

| `SMTP\_HOST` | SMTP server host | None | `smtp.sendgrid.net` |

| `SMTP\_PORT` | SMTP server port | `587` | `587` |

| `SMTP\_USER` | SMTP username | None | `apikey` |

| `SMTP\_PASS` | SMTP password | None | `SG.xxx` |

| `FROM\_EMAIL` | Sender email | None | `noreply@aarogya-health.com` |

| `SENTRY\_DSN` | Sentry error tracking | None | `https://...` |

| `CACHE\_TTL` | Cache time-to-live (ms) | `300000` | `600000` |



\### Environment-Specific Settings



| Variable | Development | Staging | Production |

|----------|-------------|---------|------------|

| `NODE\_ENV` | `development` | `staging` | `production` |

| `LOG\_LEVEL` | `debug` | `info` | `info` |

| `COOKIE\_SECURE` | `false` | `true` | `true` |

| `RATE\_LIMIT\_MAX` | `200` | `150` | `100` |



\---



\## 🖥️ Server Configuration



\### Express.js Server Settings



| Setting | Description | Default | Recommended |

|---------|-------------|---------|-------------|

| `PORT` | Server port | `5000` | `5000` |

| `JSON\_LIMIT` | JSON body size | `10mb` | `10mb` |

| `URL\_ENCODED\_LIMIT` | Form data limit | `10mb` | `10mb` |

| `TRUST\_PROXY` | Trust proxy headers | `false` | `true` (production) |



\### CORS Configuration



```javascript

app.use(cors({

&#x20;   origin: process.env.CLIENT\_URL || '\*',

&#x20;   credentials: true,

&#x20;   methods: \['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],

&#x20;   allowedHeaders: \['Content-Type', 'Authorization']

}));





Setting	Description	Default

origin	Allowed origins	\* (or CLIENT\_URL)

credentials	Allow cookies in CORS	true

methods	Allowed HTTP methods	GET, POST, PUT, DELETE, OPTIONS

💾 Database Configuration

MongoDB Connection Options

javascript

const connectionOptions = {

&#x20;   useNewUrlParser: true,

&#x20;   useUnifiedTopology: true,

&#x20;   maxPoolSize: 10,

&#x20;   serverSelectionTimeoutMS: 5000,

&#x20;   socketTimeoutMS: 45000,

&#x20;   ssl: true,

&#x20;   sslValidate: true

};

Option	Description	Default	Recommended

maxPoolSize	Max connections in pool	10	10-20

serverSelectionTimeoutMS	Server selection timeout	5000ms	5000ms

socketTimeoutMS	Socket timeout	45000ms	45000ms

ssl	Enable SSL/TLS	true	true

sslValidate	Validate SSL certificates	true	true

retryWrites	Enable retry on writes	true	true

Connection Pool Sizing

Environment	Max Pool Size	Min Pool Size

Development	5	1

Staging	10	2

Production	20-30	5

🔐 Authentication Configuration

JWT Configuration

javascript

const jwtConfig = {

&#x20;   secret: process.env.JWT\_SECRET,

&#x20;   expiresIn: '1h',

&#x20;   issuer: 'aarogya-health',

&#x20;   audience: 'aarogya-users'

};

Setting	Description	Default	Recommended

JWT\_SECRET	Signing secret	None	32+ character string

expiresIn	Token expiration	1h	1h or 24h

issuer	Token issuer	aarogya-health	Application name

audience	Token audience	aarogya-users	User type

Cookie Configuration

javascript

res.cookie('token', token, {

&#x20;   httpOnly: true,

&#x20;   secure: process.env.NODE\_ENV === 'production',

&#x20;   maxAge: 3600000,

&#x20;   sameSite: 'strict',

&#x20;   path: '/'

});

Setting	Description	Default	Recommended

httpOnly	Prevent JavaScript access	true	true

secure	HTTPS only	false	true (production)

maxAge	Cookie lifetime (ms)	3600000	3600000

sameSite	CSRF protection	strict	strict or lax

path	Cookie path	/	/

🛡️ Security Configuration

Rate Limiting Configuration

javascript

// General API limiter

const generalLimiter = rateLimit({

&#x20;   windowMs: 15 \* 60 \* 1000,

&#x20;   max: 100,

&#x20;   message: 'Too many requests, please try again later.'

});



// Authentication limiter

const authLimiter = rateLimit({

&#x20;   windowMs: 15 \* 60 \* 1000,

&#x20;   max: 10,

&#x20;   message: 'Too many login attempts, please try again later.'

});



// Chat limiter

const chatLimiter = rateLimit({

&#x20;   windowMs: 1 \* 60 \* 1000,

&#x20;   max: 10,

&#x20;   message: 'Too many chat requests, please wait a moment.'

});

Limiter	Window	Max Requests	Routes

General	15 min	100	All routes

Authentication	15 min	10	/login, /signup

Chat	1 min	10	/chat

Health Analysis	5 min	20	/analyze-health

Security Headers (Helmet.js)

javascript

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

🤖 AI \& External Services

OpenAI Configuration

javascript

const openai = new OpenAI({

&#x20;   apiKey: process.env.OPENAI\_API\_KEY,

&#x20;   timeout: 30000,

&#x20;   maxRetries: 2,

&#x20;   maxResponseTokens: 150,

&#x20;   temperature: 0.7

});

Setting	Description	Default	Recommended

apiKey	OpenAI API key	None	Set in .env

timeout	Request timeout (ms)	30000	30000

maxRetries	Retry attempts	2	2

max\_tokens	Response tokens	150	150-300

temperature	Creativity	0.7	0.5-0.8

Hugging Face Configuration

javascript

const huggingFaceConfig = {

&#x20;   model: 'mistralai/Mistral-7B-Instruct-v0.1',

&#x20;   timeout: 30000,

&#x20;   maxRetries: 2

};

Setting	Description	Default	Recommended

model	Model to use	mistralai/Mistral-7B-Instruct-v0.1	As needed

timeout	Request timeout	30000ms	30000ms

maxRetries	Retry attempts	2	2

📧 Email Configuration

SMTP Configuration

javascript

const emailConfig = {

&#x20;   host: process.env.SMTP\_HOST,

&#x20;   port: parseInt(process.env.SMTP\_PORT) || 587,

&#x20;   secure: false,

&#x20;   auth: {

&#x20;       user: process.env.SMTP\_USER,

&#x20;       pass: process.env.SMTP\_PASS

&#x20;   },

&#x20;   from: process.env.FROM\_EMAIL

};

Setting	Description	Default	Required

SMTP\_HOST	SMTP server	None	Yes

SMTP\_PORT	SMTP port	587	Yes

SMTP\_USER	SMTP username	None	Yes

SMTP\_PASS	SMTP password	None	Yes

FROM\_EMAIL	Sender address	None	Yes

Email Templates

Template	Purpose	Variables

welcome	Welcome new user	name, email, loginLink

appointment-confirmation	Confirm booking	patientName, doctorName, date, time

appointment-reminder	Remind of appointment	patientName, doctorName, date, time

appointment-cancellation	Confirm cancellation	patientName, doctorName, date

📁 Static Assets \& Uploads

Static File Configuration

javascript

app.use(express.static(path.join(\_\_dirname, 'public'), {

&#x20;   maxAge: '1y',

&#x20;   etag: true,

&#x20;   lastModified: true

}));

Setting	Description	Default

public	Static directory	/public

maxAge	Cache duration	1y (production)

etag	Enable ETag	true

Upload Configuration

javascript

const uploadConfig = {

&#x20;   destination: './uploads/',

&#x20;   maxFileSize: 5 \* 1024 \* 1024, // 5MB

&#x20;   allowedTypes: \['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],

&#x20;   allowedExtensions: \['.jpg', '.jpeg', '.png', '.gif', '.pdf']

};

Setting	Description	Default	Recommended

maxFileSize	Max file size	5MB	5-10MB

allowedTypes	Allowed MIME types	Images only	Based on needs

allowedExtensions	Allowed extensions	.jpg, .png	Based on needs

📝 Configuration Best Practices

Environment Variables

bash

\# DO: Use descriptive names

MONGO\_CONNECTION\_URL=mongodb+srv://...



\# DON'T: Use vague names

DB=...



\# DO: Group related variables

OPENAI\_API\_KEY=...

OPENAI\_MODEL=gpt-3.5-turbo

OPENAI\_TIMEOUT=30000



\# DO: Use defaults in code

const port = process.env.PORT || 5000;

Configuration Validation

javascript

function validateConfig() {

&#x20;   const required = \['MONGO\_URL', 'JWT\_SECRET'];

&#x20;   const missing = required.filter(key => !process.env\[key]);

&#x20;   

&#x20;   if (missing.length > 0) {

&#x20;       throw new Error(`Missing required variables: ${missing.join(', ')}`);

&#x20;   }

&#x20;   

&#x20;   // Validate JWT\_SECRET strength

&#x20;   if (process.env.JWT\_SECRET.length < 32) {

&#x20;       console.warn('⚠️ JWT\_SECRET should be at least 32 characters');

&#x20;   }

}

Configuration Checklist

All required variables set



.env file created and configured



.env in .gitignore



Secrets are strong (32+ characters)



Environment-specific values correct



Configuration validated on startup



Documentation updated when adding variables



📚 Resources

Configuration Files

.env - Local environment variables



.env.example - Template for new developers



package.json - Package configuration



nodemon.json - Nodemon configuration



Links

Express Configuration Guide



MongoDB Connection Options



Helmet.js Documentation



OpenAI API Reference





"Democratizing healthcare through intelligent technology"





