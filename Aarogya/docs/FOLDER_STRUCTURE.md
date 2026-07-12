# Folder Structure

This document explains the purpose of every folder and key file in the Aarogya (HealthLink) project, so new contributors can quickly find their way around and know where to add new code.

Aarogya is a server-rendered Node.js/Express app that uses EJS templates for its views and MongoDB (via Mongoose) for data storage. All application code lives inside the `Aarogya/` directory.

## Top-level layout

```
Aarogya/
├── models/          # Mongoose schemas (database layer)
├── public/          # Static assets served directly to the browser
├── routes/          # Express route modules
├── views/           # EJS templates rendered by the server
├── docs/            # Project documentation (this file lives here)
├── server.js        # Application entry point
├── package.json     # Dependencies and npm scripts
├── package-lock.json
└── README.md        # Project overview, setup instructions, features
```

## Folder-by-folder breakdown

### `models/`
Mongoose schema definitions — the data layer of the app.

| File | Purpose |
|------|---------|
| `User.js` | Schema for both patients and doctors. Includes `role` (`"doctor"` \| `"patient"`), auth fields (`email`, `password`), and doctor-only fields (`specialization`, `experience`, `bio`). |
| `Appointment.js` | Schema for booked appointments, linking a `patient` and `doctor` (both references to `User`), along with `symptoms`, `date`, and `status`. |

**Where to add new files:** Add a new `<Name>.js` file here for any new MongoDB collection/schema.

### `routes/`
Express router modules that group related HTTP endpoints. Some routes are also defined directly in `server.js` (see below) — the project is mid-migration toward moving all routes into this folder.

| File | Purpose |
|------|---------|
| `authRoutes.js` | Signup/login endpoints (currently a second copy of logic also present in `server.js`). |
| `dashboardRoutes.js` | Authenticated dashboard-related endpoints. |

**Where to add new files:** Add a new `<feature>Routes.js` file here for a new group of endpoints, and mount it with `app.use()` in `server.js`.

### `views/`
EJS templates rendered on the server (`app.set("view engine", "ejs")` in `server.js`). Each file corresponds to a full page.

| File | Renders |
|------|---------|
| `login.ejs` | Login page |
| `signup.ejs` | Signup page |
| `dashboard.ejs` | Patient/doctor dashboard |
| `doctors.ejs` | List of available doctors |
| `doctorProfile.ejs` | Single doctor's profile / booking page |
| `doctorAppointments.ejs` | Doctor's view of their appointments |
| `contactus.ejs` | Contact form page |
| `ourteam.ejs` | Team/about page |

**Where to add new files:** Add a new `<page>.ejs` file here for any new server-rendered page, then `res.render("<page>", { ... })` it from a route.

### `public/`
Static assets served directly by Express (`app.use(express.static(...))` in `server.js`). Anything in here is publicly accessible at the site root (e.g. `public/css/index.css` → `/css/index.css`).

| Subfolder | Contents |
|-----------|----------|
| `css/` | Stylesheets, one per page/feature (`index.css`, `Login.css`, `SignUp.css`, `dashboard.css`, `docters.css`, `healthlinkAI.css`) |
| `js/` | Client-side JavaScript, one per page/feature (`index.js`, `dashboard.js`, `doctors.js`, `healthlinkAI.js`) |
| `img/` | Images and logos (`healthlink_logo.png`, `Passport.jpg`, `ApexLegion.png`) |
| `index.html` | Static landing page markup |
| `healthlinkAI.html` | Static markup for the AI health-chat page |

**Where to add new files:** Add stylesheets to `public/css/`, client-side scripts to `public/js/`, and images to `public/img/`.

### `docs/`
Project documentation, including this file. Add new markdown docs here (e.g. architecture notes, API docs, FAQs) and link them from the root `README.md`.

## Key root files

| File | Purpose |
|------|---------|
| `server.js` | Main entry point. Sets up Express, connects to MongoDB via Mongoose, configures middleware (auth via JWT cookies, CORS, body parsing), and defines most routes/pages directly (signup, login, dashboard, doctors, appointments, AI chat, contact). Started via `npm start` (`node server.js`) or `npm run dev` (`nodemon server.js`). |
| `package.json` | Declares dependencies (Express, Mongoose, EJS, JWT, bcryptjs, OpenAI SDK, etc.) and npm scripts (`start`, `dev`). |
| `README.md` | High-level project overview: features, tech stack, and local setup instructions. |

## Notes for new contributors

- There is currently **no `controllers/`, `middleware/`, `config/`, or `utils/` folder** — request handling logic, including auth middleware (`requireAuth`, `checkLoggedIn`), lives inline in `server.js`. If you're refactoring, that's a natural place to extract new folders from.
- Some route logic (e.g. signup/login) exists both inline in `server.js` and in `routes/authRoutes.js`; check `server.js` first, since that's what's currently wired up and running.
- There are no automated tests yet (`npm test` is a placeholder), so there's no `tests/` folder to place new files in.
