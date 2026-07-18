\# 📋 Aarogya - API Error Reference Documentation



\## 📋 Introduction



This document provides a comprehensive reference for all API error responses returned by the Aarogya API. Understanding these errors helps developers debug issues, implement proper error handling, and build robust client applications.



\---



\## 📑 Table of Contents



\- \[HTTP Status Code Reference](#http-status-code-reference)

\- \[Error Response Structure](#error-response-structure)

\- \[Error Categories](#error-categories)

\- \[Validation Errors](#validation-errors)

\- \[Authentication Errors](#authentication-errors)

\- \[Authorization Errors](#authorization-errors)

\- \[Resource Not Found Errors](#resource-not-found-errors)

\- \[Conflict Errors](#conflict-errors)

\- \[Rate Limiting Errors](#rate-limiting-errors)

\- \[Server Errors](#server-errors)

\- \[Error Code Index](#error-code-index)

\- \[Troubleshooting Guide](#troubleshooting-guide)



\---



\## 🌐 HTTP Status Code Reference



\### 2xx - Success Responses



| Code | Meaning | When Used |

|------|---------|-----------|

| `200 OK` | Success | Request completed successfully |

| `201 Created` | Created | New resource successfully created |

| `204 No Content` | No Content | Success with no response body |

| `302 Found` | Redirect | Temporary redirect (e.g., after login) |



\### 4xx - Client Error Responses



| Code | Meaning | When Used |

|------|---------|-----------|

| `400 Bad Request` | Bad Request | Invalid or malformed request data |

| `401 Unauthorized` | Unauthorized | Authentication required or failed |

| `403 Forbidden` | Forbidden | Authenticated but lacking permission |

| `404 Not Found` | Not Found | Requested resource does not exist |

| `409 Conflict` | Conflict | Request conflicts with current state |

| `429 Too Many Requests` | Too Many Requests | Rate limit exceeded |



\### 5xx - Server Error Responses



| Code | Meaning | When Used |

|------|---------|-----------|

| `500 Internal Server Error` | Internal Server Error | Unexpected server error occurred |



\---



\## 📝 Error Response Structure



\### Standard Error Payload



```json

{

&#x20;   "success": false,

&#x20;   "status": 400,

&#x20;   "message": "Invalid request data",

&#x20;   "code": "VALIDATION\_ERROR",

&#x20;   "timestamp": "2024-11-24T10:00:00.000Z",

&#x20;   "requestId": "req\_abc123def456",

&#x20;   "path": "/api/auth/signup",

&#x20;   "errors": \[

&#x20;       {

&#x20;           "field": "email",

&#x20;           "message": "Please provide a valid email address"

&#x20;       }

&#x20;   ]

}





Field Descriptions

Field	Type	Description

success	Boolean	Always false for error responses

status	Number	HTTP status code of the error

message	String	Human-readable error message

code	String	Machine-readable error identifier

timestamp	String	ISO 8601 timestamp of error occurrence

requestId	String	Unique identifier for request tracking

path	String	API endpoint path that returned the error

errors	Array	Detailed error information (validation-specific)

stack	String	Stack trace (development environment only)

🚫 Error Categories

Validation Errors (400)

Validation errors occur when the request data fails to meet validation rules.



Scenario: Required Fields Missing

Request:



text

POST /api/auth/signup

Content-Type: application/json



{

&#x20;   "email": "test@example.com"

&#x20;   // Missing name, password, role

}

Error Response:



json

{

&#x20;   "success": false,

&#x20;   "status": 400,

&#x20;   "message": "Validation failed",

&#x20;   "code": "VALIDATION\_ERROR",

&#x20;   "timestamp": "2024-11-24T10:00:00.000Z",

&#x20;   "requestId": "req\_abc123def456",

&#x20;   "path": "/api/auth/signup",

&#x20;   "errors": \[

&#x20;       {

&#x20;           "field": "name",

&#x20;           "message": "Name is required"

&#x20;       },

&#x20;       {

&#x20;           "field": "password",

&#x20;           "message": "Password is required"

&#x20;       },

&#x20;       {

&#x20;           "field": "role",

&#x20;           "message": "Role is required"

&#x20;       }

&#x20;   ]

}

Scenario: Invalid Email Format

Request:



text

POST /api/auth/signup

Content-Type: application/json



{

&#x20;   "name": "Jane Smith",

&#x20;   "email": "not-an-email",

&#x20;   "password": "Secure@123",

&#x20;   "role": "patient"

}

Error Response:



json

{

&#x20;   "success": false,

&#x20;   "status": 400,

&#x20;   "message": "Validation failed",

&#x20;   "code": "VALIDATION\_ERROR",

&#x20;   "timestamp": "2024-11-24T10:00:00.000Z",

&#x20;   "requestId": "req\_abc123def456",

&#x20;   "path": "/api/auth/signup",

&#x20;   "errors": \[

&#x20;       {

&#x20;           "field": "email",

&#x20;           "message": "Please enter a valid email address"

&#x20;       }

&#x20;   ]

}

Scenario: Password Too Short

Request:



text

POST /api/auth/signup

Content-Type: application/json



{

&#x20;   "name": "Jane Smith",

&#x20;   "email": "jane@example.com",

&#x20;   "password": "123",

&#x20;   "role": "patient"

}

Error Response:



json

{

&#x20;   "success": false,

&#x20;   "status": 400,

&#x20;   "message": "Validation failed",

&#x20;   "code": "VALIDATION\_ERROR",

&#x20;   "timestamp": "2024-11-24T10:00:00.000Z",

&#x20;   "requestId": "req\_abc123def456",

&#x20;   "path": "/api/auth/signup",

&#x20;   "errors": \[

&#x20;       {

&#x20;           "field": "password",

&#x20;           "message": "Password must be at least 6 characters long"

&#x20;       }

&#x20;   ]

}

Validation Error Reference

Field	Validation Rule	Error Message

name	Required	"Name is required"

name	Min length 2	"Name must be at least 2 characters long"

name	Max length 100	"Name cannot exceed 100 characters"

email	Required	"Email is required"

email	Valid format	"Please enter a valid email address"

password	Required	"Password is required"

password	Min length 6	"Password must be at least 6 characters long"

role	Required	"Role is required"

role	Valid values	"Role must be either 'doctor' or 'patient'"

patientName	Required	"Patient name is required"

patientName	Min length 2	"Name must be at least 2 characters long"

patientAge	Required	"Patient age is required"

patientAge	Range 0-150	"Please enter a valid age between 0 and 150"

symptoms	Required	"Symptoms are required"

symptoms	Min length 3	"Symptoms must be at least 3 characters long"

Authentication Errors (401)

Authentication errors occur when the user is not properly authenticated.



Scenario: No Authentication Token

Request:



text

GET /api/dashboard

(Cookie missing or no token)

Error Response:



json

{

&#x20;   "success": false,

&#x20;   "status": 401,

&#x20;   "message": "Authentication required",

&#x20;   "code": "AUTHENTICATION\_ERROR",

&#x20;   "timestamp": "2024-11-24T10:00:00.000Z",

&#x20;   "requestId": "req\_abc123def456",

&#x20;   "path": "/api/dashboard"

}

Scenario: Invalid Login Credentials

Request:



text

POST /api/auth/login

Content-Type: application/json



{

&#x20;   "email": "user@example.com",

&#x20;   "password": "wrong\_password"

}

Error Response:



json

{

&#x20;   "success": false,

&#x20;   "status": 401,

&#x20;   "message": "Incorrect password. Try again.",

&#x20;   "code": "AUTHENTICATION\_ERROR",

&#x20;   "timestamp": "2024-11-24T10:00:00.000Z",

&#x20;   "requestId": "req\_abc123def456",

&#x20;   "path": "/api/auth/login"

}

Scenario: Expired JWT Token

Request:



text

GET /api/dashboard

Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (expired)

Error Response:



json

{

&#x20;   "success": false,

&#x20;   "status": 401,

&#x20;   "message": "Authentication token expired. Please login again.",

&#x20;   "code": "TOKEN\_EXPIRED",

&#x20;   "timestamp": "2024-11-24T10:00:00.000Z",

&#x20;   "requestId": "req\_abc123def456",

&#x20;   "path": "/api/dashboard"

}

Common Authentication Errors

Scenario	Error Code	Message

Missing token	AUTHENTICATION\_ERROR	"Authentication required"

Invalid credentials	AUTHENTICATION\_ERROR	"Incorrect password. Try again."

User not found	AUTHENTICATION\_ERROR	"No account found"

Token expired	TOKEN\_EXPIRED	"Authentication token expired"

Malformed token	INVALID\_TOKEN	"Invalid authentication token"

Authorization Errors (403)

Authorization errors occur when the authenticated user lacks permission for the requested action.



Scenario: Patient Accessing Doctor Endpoint

Request:



text

GET /api/view-appointments

Cookie: token=valid-token (patient role)

Error Response:



json

{

&#x20;   "success": false,

&#x20;   "status": 403,

&#x20;   "message": "Access denied. Doctor only.",

&#x20;   "code": "AUTHORIZATION\_ERROR",

&#x20;   "timestamp": "2024-11-24T10:00:00.000Z",

&#x20;   "requestId": "req\_abc123def456",

&#x20;   "path": "/api/view-appointments"

}

Scenario: Doctor Booking Appointment

Request:



text

POST /api/appointment/doctor-123

Cookie: token=valid-token (doctor role)

Error Response:



json

{

&#x20;   "success": false,

&#x20;   "status": 403,

&#x20;   "message": "Only patients can book appointments",

&#x20;   "code": "AUTHORIZATION\_ERROR",

&#x20;   "timestamp": "2024-11-24T10:00:00.000Z",

&#x20;   "requestId": "req\_abc123def456",

&#x20;   "path": "/api/appointment/doctor-123"

}

Common Authorization Errors

Scenario	Error Code	Message

Wrong role	AUTHORIZATION\_ERROR	"Access denied. \[Role] only."

Patient action	AUTHORIZATION\_ERROR	"Only patients can book appointments"

Insufficient permissions	AUTHORIZATION\_ERROR	"You do not have permission"

Resource Not Found Errors (404)

Not found errors occur when the requested resource does not exist.



Scenario: User Not Found

Request:



text

POST /api/auth/login

Content-Type: application/json



{

&#x20;   "email": "unknown@example.com",

&#x20;   "password": "password123"

}

Error Response:



json

{

&#x20;   "success": false,

&#x20;   "status": 404,

&#x20;   "message": "No account found. Please sign up first.",

&#x20;   "code": "NOT\_FOUND\_ERROR",

&#x20;   "timestamp": "2024-11-24T10:00:00.000Z",

&#x20;   "requestId": "req\_abc123def456",

&#x20;   "path": "/api/auth/login"

}

Scenario: Doctor Not Found

Request:



text

POST /api/appointment/invalid-id

Cookie: token=valid-token

Error Response:



json

{

&#x20;   "success": false,

&#x20;   "status": 404,

&#x20;   "message": "Doctor not found",

&#x20;   "code": "NOT\_FOUND\_ERROR",

&#x20;   "timestamp": "2024-11-24T10:00:00.000Z",

&#x20;   "requestId": "req\_abc123def456",

&#x20;   "path": "/api/appointment/invalid-id"

}

Conflict Errors (409)

Conflict errors occur when the request conflicts with the current server state.



Scenario: Duplicate Email Registration

Request:



text

POST /api/auth/signup

Content-Type: application/json



{

&#x20;   "name": "John Doe",

&#x20;   "email": "existing@example.com",

&#x20;   "password": "Secure@123",

&#x20;   "role": "patient"

}

Error Response:



json

{

&#x20;   "success": false,

&#x20;   "status": 409,

&#x20;   "message": "User already exists. Please login.",

&#x20;   "code": "CONFLICT\_ERROR",

&#x20;   "timestamp": "2024-11-24T10:00:00.000Z",

&#x20;   "requestId": "req\_abc123def456",

&#x20;   "path": "/api/auth/signup"

}

Rate Limiting Errors (429)

Rate limiting errors occur when the user exceeds the allowed request quota.



Scenario: Too Many Chat Requests

Request:



text

POST /api/chat

(10th request within 1 minute)

Error Response:



json

{

&#x20;   "success": false,

&#x20;   "status": 429,

&#x20;   "message": "Rate limit exceeded. Please try again later.",

&#x20;   "code": "RATE\_LIMIT\_ERROR",

&#x20;   "timestamp": "2024-11-24T10:00:00.000Z",

&#x20;   "requestId": "req\_abc123def456",

&#x20;   "path": "/api/chat"

}

Rate Limit Reference

Endpoint	Limit	Time Window

/api/auth/login	10 requests	15 minutes

/api/chat	10 requests	1 minute

/api/analyze-health	20 requests	5 minutes

General API	100 requests	15 minutes

Server Errors (500)

Server errors occur when the server encounters an unexpected condition.



Scenario: Database Connection Issue

Error Response:



json

{

&#x20;   "success": false,

&#x20;   "status": 500,

&#x20;   "message": "Database operation failed",

&#x20;   "code": "DATABASE\_ERROR",

&#x20;   "timestamp": "2024-11-24T10:00:00.000Z",

&#x20;   "requestId": "req\_abc123def456",

&#x20;   "path": "/api/dashboard"

}

Scenario: External Service Unavailable

Error Response:



json

{

&#x20;   "success": false,

&#x20;   "status": 500,

&#x20;   "message": "AI service temporarily unavailable",

&#x20;   "code": "EXTERNAL\_SERVICE\_ERROR",

&#x20;   "timestamp": "2024-11-24T10:00:00.000Z",

&#x20;   "requestId": "req\_abc123def456",

&#x20;   "path": "/api/analyze-health"

}

📊 Error Code Index

Error Code	HTTP Status	Description	Usage Context

VALIDATION\_ERROR	400	Input validation failed	Any request with invalid data

AUTHENTICATION\_ERROR	401	Authentication required or failed	Protected endpoints, login

TOKEN\_EXPIRED	401	JWT token expired	Protected endpoints

INVALID\_TOKEN	401	Invalid JWT token	Protected endpoints

AUTHORIZATION\_ERROR	403	Permission denied	Role-based endpoints

NOT\_FOUND\_ERROR	404	Resource not found	GET, POST, PUT, DELETE

CONFLICT\_ERROR	409	Resource conflict	Signup, duplicate operations

DUPLICATE\_ERROR	409	Duplicate entry	Unique field violations

RATE\_LIMIT\_ERROR	429	Rate limit exceeded	Chat, auth endpoints

INTERNAL\_ERROR	500	Internal server error	Unexpected errors

DATABASE\_ERROR	500	Database operation failed	DB operations

EXTERNAL\_SERVICE\_ERROR	500	External service failure	AI, email services

🛠️ Troubleshooting Guide

Quick Diagnostic Flow

text

1\. Check HTTP Status Code

&#x20;  ├── 4xx → Client-side issue

&#x20;  │   ├── 400 → Check request data

&#x20;  │   ├── 401 → Check authentication

&#x20;  │   ├── 403 → Check permissions

&#x20;  │   ├── 404 → Check resource ID

&#x20;  │   ├── 409 → Check for duplicates

&#x20;  │   └── 429 → Wait and retry

&#x20;  └── 5xx → Server-side issue

&#x20;      └── 500 → Contact support



2\. Check Error Code

&#x20;  └── Use error code for specific handling



3\. Check Request ID

&#x20;  └── Use for log tracing

Common Error Resolution

Error Code	Common Cause	Resolution

VALIDATION\_ERROR	Missing/invalid fields	Review request body

AUTHENTICATION\_ERROR	No/invalid token	Login again

TOKEN\_EXPIRED	Expired JWT	Login again

AUTHORIZATION\_ERROR	Wrong user role	Use correct account

NOT\_FOUND\_ERROR	Invalid ID	Check resource ID

CONFLICT\_ERROR	Duplicate email	Use different email

RATE\_LIMIT\_ERROR	Too many requests	Wait and retry

INTERNAL\_ERROR	Server issue	Contact support

Using Request ID for Debugging

text

1\. Capture the requestId from error response

2\. Search application logs for the requestId

3\. Review log entries with that requestId

4\. Identify the error source

📚 Additional Resources

Documentation

API Documentation



Configuration Guide



External References

MDN HTTP Status Codes



HTTP Status Codes Reference





"Democratizing healthcare through intelligent technology"

