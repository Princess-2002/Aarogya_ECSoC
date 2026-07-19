\# ♿ Aarogya - Accessibility Guide for Inclusive Development



\## 📋 Introduction



This guide outlines accessibility best practices for the Aarogya project. By following these guidelines, we ensure that our healthcare application is accessible to all users, regardless of their abilities or disabilities.



\---



\## 📑 Table of Contents



\- \[Why Accessibility Matters](#why-accessibility-matters)

\- \[Accessibility Principles](#accessibility-principles)

\- \[Semantic HTML](#semantic-html)

\- \[Form Accessibility](#form-accessibility)

\- \[Visual Accessibility](#visual-accessibility)

\- \[Keyboard Accessibility](#keyboard-accessibility)

\- \[ARIA Guidelines](#aria-guidelines)

\- \[Testing for Accessibility](#testing-for-accessibility)

\- \[Common Issues \& Fixes](#common-issues--fixes)

\- \[Resources](#resources)



\---



\## 🌟 Why Accessibility Matters



\### The Case for Accessibility



| Aspect | Impact |

|--------|--------|

| \*\*Global Impact\*\* | 15% of the world's population has a disability |

| \*\*User Reach\*\* | Expands user base to millions of people |

| \*\*Legal Compliance\*\* | Required by law in many countries |

| \*\*Better UX\*\* | Accessibility improves usability for everyone |

| \*\*Healthcare Mission\*\* | Healthcare must be accessible to all |



\### Accessibility in Healthcare



\- Patients with disabilities require equal access

\- Health information must be understandable

\- Inclusive design improves patient outcomes

\- Ethical obligation to provide accessible care



\---



\## 📐 Accessibility Principles



\### POUR Framework



```html

<!-- 

P: Perceivable - Content must be perceivable by all users

O: Operable - Interface must be operable by all users

U: Understandable - Content and interface must be understandable

R: Robust - Content must work with assistive technologies

\-->





Principle 1: Perceivable

Requirement	Implementation

Text Alternatives	Alt text for all images

Time-Based Media	Captions for videos

Adaptable Content	Content works in different layouts

Distinguishable Content	Clear contrast, resizable text

Principle 2: Operable

Requirement	Implementation

Keyboard Accessible	All features via keyboard

Enough Time	No time limits or extendable

Seizure Safe	No flashing > 3 per second

Navigable	Clear navigation, skip links

Principle 3: Understandable

Requirement	Implementation

Readable Text	Clear language, appropriate reading level

Predictable	Consistent navigation, predictable behavior

Input Assistance	Labels, errors, help text

Principle 4: Robust

Requirement	Implementation

Compatible	Works with assistive technologies

Valid HTML	Use valid, standards-compliant HTML

Progressive Enhancement	Works without JavaScript

🏗️ Semantic HTML

Headings

html

<!-- ✅ GOOD: Proper heading structure -->

<h1>Patient Dashboard</h1>

&#x20;   <h2>Upcoming Appointments</h2>

&#x20;       <h3>Today's Appointments</h3>

&#x20;       <h3>This Week's Appointments</h3>

&#x20;   <h2>Recent Activities</h2>

&#x20;   <h2>Quick Actions</h2>



<!-- ❌ BAD: Skipped levels -->

<h1>Patient Dashboard</h1>

&#x20;   <h3>Upcoming Appointments</h3> <!-- Missing h2 -->

&#x20;       <h4>Today's Appointments</h4> <!-- Missing h3 -->

Landmarks

html

<!-- ✅ GOOD: Semantic landmarks -->

<header role="banner">

&#x20;   <nav role="navigation">

&#x20;       <!-- Main navigation -->

&#x20;   </nav>

</header>



<main id="main" role="main">

&#x20;   <!-- Primary content -->

</main>



<aside role="complementary">

&#x20;   <!-- Sidebar content -->

</aside>



<footer role="contentinfo">

&#x20;   <!-- Footer -->

</footer>

Interactive Elements

html

<!-- ✅ GOOD: Using correct interactive elements -->

<button onclick="bookAppointment()">Book Appointment</button>

<a href="/doctors">Find a Doctor</a>



<!-- ❌ BAD: Using wrong elements -->

<div onclick="bookAppointment()" role="button">Book Appointment</div>

<button onclick="location.href='/doctors'">Find a Doctor</button>

📝 Form Accessibility

Labels

html

<!-- ✅ GOOD: Labeled inputs -->

<div class="form-group">

&#x20;   <label for="patientName">Patient Name</label>

&#x20;   <input type="text" id="patientName" name="patientName" required>

</div>



<!-- ✅ GOOD: Implicit label -->

<label>

&#x20;   Patient Name

&#x20;   <input type="text" name="patientName" required>

</label>



<!-- ❌ BAD: Unlabeled -->

<input type="text" placeholder="Patient Name" required>

Error Handling

html

<!-- ✅ GOOD: Accessible errors -->

<div class="form-group">

&#x20;   <label for="email">Email Address</label>

&#x20;   <input type="email" id="email" name="email" 

&#x20;          aria-describedby="email-error email-hint"

&#x20;          aria-invalid="true">

&#x20;   <div id="email-hint" class="hint">Enter your email address</div>

&#x20;   <div id="email-error" class="error" role="alert">

&#x20;       Please enter a valid email address

&#x20;   </div>

</div>

Required Fields

html

<!-- ✅ GOOD: Required field indicators -->

<label for="email">

&#x20;   Email Address

&#x20;   <span aria-hidden="true">\*</span>

&#x20;   <span class="sr-only">(required)</span>

</label>

<input type="email" id="email" required>

🎨 Visual Accessibility

Color Contrast

css

/\* ✅ GOOD: Accessible contrast \*/

.btn-primary {

&#x20;   background-color: #00d2ff;

&#x20;   color: #0f0c29; /\* Dark text on light background \*/

}



.btn-text {

&#x20;   color: #00d2ff; /\* Blue text \*/

}



/\* ❌ BAD: Poor contrast \*/

.btn-primary {

&#x20;   background-color: #00d2ff;

&#x20;   color: #ffffff; /\* White text on light background \*/

}



.btn-text {

&#x20;   color: #00d2ff; /\* Same as background \*/

}

Color Palette

css

/\* ✅ GOOD: Accessible color palette \*/

:root {

&#x20;   --primary: #00d2ff;

&#x20;   --primary-dark: #00b8e6;

&#x20;   --text-primary: #0f0c29;

&#x20;   --text-light: #e0e0e0;

&#x20;   --text-muted: #a0a0b0;

&#x20;   --error: #ff4757;

&#x20;   --success: #2ed573;

}

Focus Indicators

css

/\* ✅ GOOD: Visible focus indicators \*/

\*:focus-visible {

&#x20;   outline: 3px solid #00d2ff;

&#x20;   outline-offset: 2px;

&#x20;   border-radius: 4px;

}



/\* ✅ GOOD: Focus indicator for custom elements \*/

.custom-button:focus-visible {

&#x20;   box-shadow: 0 0 0 3px #00d2ff;

}



/\* ❌ BAD: Removing focus \*/

\*:focus {

&#x20;   outline: none; /\* Never do this \*/

}

Text Sizing

css

/\* ✅ GOOD: Responsive text sizing \*/

body {

&#x20;   font-size: 16px;

&#x20;   line-height: 1.5;

}



@media (max-width: 768px) {

&#x20;   body {

&#x20;       font-size: 14px;

&#x20;   }

}



/\* ✅ GOOD: Using rem units \*/

h1 { font-size: 2rem; }

h2 { font-size: 1.75rem; }

h3 { font-size: 1.5rem; }

p { font-size: 1rem; }

⌨️ Keyboard Accessibility

Focus Management

html

<!-- ✅ GOOD: Logical tab order -->

<nav>

&#x20;   <a href="/">Home</a>

&#x20;   <a href="/dashboard">Dashboard</a>

&#x20;   <a href="/doctors">Doctors</a>

</nav>



<main>

&#x20;   <h1>Patient Portal</h1>

&#x20;   <button>View Appointments</button>

&#x20;   <button>Book Appointment</button>

</main>



<!-- ✅ GOOD: Focus indicators -->

<style>

&#x20;   a:focus-visible, button:focus-visible {

&#x20;       outline: 2px solid #00d2ff;

&#x20;       outline-offset: 2px;

&#x20;   }

</style>

Skip Links

html

<!-- ✅ GOOD: Skip to main content -->

<body>

&#x20;   <a href="#main-content" class="skip-link">

&#x20;       Skip to main content

&#x20;   </a>

&#x20;   

&#x20;   <header>

&#x20;       <nav><!-- Navigation --></nav>

&#x20;   </header>

&#x20;   

&#x20;   <main id="main-content">

&#x20;       <!-- Content -->

&#x20;   </main>

</body>



<style>

&#x20;   .skip-link {

&#x20;       position: absolute;

&#x20;       top: -999px;

&#x20;       left: 50%;

&#x20;       transform: translateX(-50%);

&#x20;       padding: 12px 24px;

&#x20;       background: #0f0c29;

&#x20;       color: white;

&#x20;       z-index: 9999;

&#x20;   }

&#x20;   

&#x20;   .skip-link:focus {

&#x20;       top: 10px;

&#x20;   }

</style>

Keyboard Shortcuts

html

<!-- ✅ GOOD: Keyboard shortcuts for actions -->

<button onclick="submit()" accesskey="s">

&#x20;   Submit (Alt+S)

</button>



<button onclick="cancel()" accesskey="c">

&#x20;   Cancel (Alt+C)

</button>



<div class="shortcut-hint">

&#x20;   Tip: Use Alt+S to submit, Alt+C to cancel

</div>

♿ ARIA Guidelines

ARIA Best Practices

html

<!-- ✅ GOOD: Using ARIA appropriately -->



<!-- 1. Label for icon buttons -->

<button aria-label="Close menu">

&#x20;   <span aria-hidden="true">✕</span>

</button>



<!-- 2. Live region for updates -->

<div role="status" aria-live="polite" id="notification">

&#x20;   <!-- Dynamic content -->

</div>



<!-- 3. Expandable content -->

<button aria-expanded="false" 

&#x20;       aria-controls="appointments-list"

&#x20;       onclick="toggleList()">

&#x20;   Show Appointments

</button>

<div id="appointments-list" hidden>

&#x20;   <!-- Appointments -->

</div>



<!-- 4. Tab panels -->

<div role="tablist">

&#x20;   <button role="tab" aria-selected="true" 

&#x20;           aria-controls="panel-1" id="tab-1">

&#x20;       Upcoming

&#x20;   </button>

&#x20;   <button role="tab" aria-selected="false" 

&#x20;           aria-controls="panel-2" id="tab-2">

&#x20;       Past

&#x20;   </button>

</div>

ARIA Landmarks

html

<!-- ✅ GOOD: ARIA landmarks -->

<div role="banner">    <!-- Header -->

<div role="navigation"> <!-- Navigation -->

<div role="main">      <!-- Main content -->

<div role="complementary"> <!-- Aside -->

<div role="contentinfo">   <!-- Footer -->



<!-- ✅ GOOD: Using HTML5 equivalents -->

<header role="banner">

<nav role="navigation">

<main role="main">

<aside role="complementary">

<footer role="contentinfo">

🧪 Testing for Accessibility

Automated Tools

Tool	Description	Usage

axe DevTools	Comprehensive testing	Browser extension

Lighthouse	Performance + Accessibility	Chrome DevTools

WAVE	Visual accessibility tool	Browser extension

Accessibility Insights	Full testing suite	Browser extension

Manual Testing

Keyboard Testing Steps

text

1\. Navigate using Tab key

2\. Use Shift+Tab to go backwards

3\. Activate elements with Enter/Space

4\. Close modals with Escape key

5\. Check focus indicators on all elements

6\. Verify logical tab order

7\. Test all interactive elements

Screen Reader Testing

bash

\# NVDA (Windows)

\# 1. Install NVDA from nvaccess.org

\# 2. Use Insert+Down Arrow to read page

\# 3. Use Tab to navigate elements

\# 4. Use Arrow keys for fine navigation



\# VoiceOver (Mac)

\# 1. Enable in System Preferences

\# 2. Use Command+F5 to toggle

\# 3. Use Control+Option+Arrow to navigate



\# ChromeVox (Chrome)

\# 1. Install ChromeVox extension

\# 2. Use Search+Arrow to navigate

\# 3. Use Search+Space to activate

Testing Checklist

All images have alt text



All forms have labels



Color contrast is sufficient



Focus indicators are visible



Page is navigable via keyboard



No keyboard traps



Headings are properly nested



ARIA attributes are valid



Dynamic updates are announced



Content is readable and understandable



🔧 Common Issues \& Fixes

Issue: Missing Labels

html

<!-- ❌ BAD -->

<input type="text" name="email">



<!-- ✅ GOOD -->

<label for="email">Email</label>

<input type="text" id="email" name="email">

Issue: Poor Color Contrast

css

/\* ❌ BAD \*/

.text {

&#x20;   color: #999999; /\* Too light \*/

}



/\* ✅ GOOD \*/

.text {

&#x20;   color: #333333; /\* Sufficient contrast \*/

}

Issue: No Focus Indicator

css

/\* ❌ BAD \*/

button:focus {

&#x20;   outline: none;

}



/\* ✅ GOOD \*/

button:focus-visible {

&#x20;   outline: 3px solid #00d2ff;

&#x20;   outline-offset: 2px;

}

Issue: Inaccessible Modals

javascript

// ❌ BAD: No focus management

function openModal() {

&#x20;   document.getElementById('modal').style.display = 'block';

}



// ✅ GOOD: Focus trapping

function openModal() {

&#x20;   const modal = document.getElementById('modal');

&#x20;   modal.style.display = 'block';

&#x20;   modal.focus();

&#x20;   

&#x20;   // Trap focus in modal

&#x20;   const focusable = modal.querySelectorAll('button, a, input');

&#x20;   const first = focusable\[0];

&#x20;   const last = focusable\[focusable.length - 1];

&#x20;   

&#x20;   modal.addEventListener('keydown', function(e) {

&#x20;       if (e.key === 'Tab') {

&#x20;           if (e.shiftKey \&\& document.activeElement === first) {

&#x20;               e.preventDefault();

&#x20;               last.focus();

&#x20;           } else if (!e.shiftKey \&\& document.activeElement === last) {

&#x20;               e.preventDefault();

&#x20;               first.focus();

&#x20;           }

&#x20;       }

&#x20;   });

}

📚 Resources

Standards \& Guidelines

WCAG 2.1



WAI-ARIA Practices



WebAIM Accessibility



Tools \& Testing

axe DevTools



WAVE Evaluation Tool



Accessibility Insights



Learning Resources

Google Accessibility Course



MDN Accessibility



FreeCodeCamp Accessibility





"Democratizing healthcare through intelligent technology"





