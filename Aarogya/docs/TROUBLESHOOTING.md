\# 🐛 Aarogya - Troubleshooting Handbook



\## 📋 Overview

This comprehensive troubleshooting guide helps you resolve common issues encountered during development. If you can't find your issue here, please open a GitHub issue.



\---



\## 📋 Table of Contents

\- \[Installation Problems](#installation-problems)

\- \[Environment Variables Issues](#environment-variables-issues)

\- \[npm \& Package Manager Issues](#npm--package-manager-issues)

\- \[MongoDB Connection Issues](#mongodb-connection-issues)

\- \[Server \& Node.js Issues](#server--nodejs-issues)

\- \[Port \& Network Issues](#port--network-issues)

\- \[Authentication \& Authorization Issues](#authentication--authorization-issues)

\- \[Browser \& Frontend Issues](#browser--frontend-issues)

\- \[Database \& Query Issues](#database--query-issues)

\- \[Git \& Version Control Issues](#git--version-control-issues)



\---



\## 🔧 Installation Problems



\### Issue: npm install fails with permission errors



\*\*Symptoms:\*\*

npm ERR! Error: EACCES: permission denied

npm ERR! Please try running this command again as root/Administrator.



text



\*\*Solutions:\*\*



```bash

\# Solution 1: Use sudo (Mac/Linux)

sudo npm install



\# Solution 2: Fix npm permissions

sudo chown -R $(whoami) \~/.npm

sudo chown -R $(whoami) /usr/local/lib/node\_modules



\# Solution 3: Use Node Version Manager (nvm)

nvm install 18

nvm use 18

npm install



\# Solution 4: Use different directory

cd \~

mkdir projects

cd projects

git clone https://github.com/Princess-2002/Aarogya.git

cd Aarogya

npm install

Issue: npm install hangs or is extremely slow

Symptoms:



Installation takes forever



"fetchMetadata: sill" messages



Network timeout errors



Solutions:



bash

\# Solution 1: Use yarn instead

npm install -g yarn

yarn install



\# Solution 2: Use Chinese npm mirror (if in China)

npm config set registry https://registry.npmmirror.com

npm install



\# Solution 3: Clear cache and retry

npm cache clean --force

npm install



\# Solution 4: Use offline mode

npm install --offline



\# Solution 5: Increase timeout

npm install --timeout=999999

🔑 Environment Variables Issues

Issue: .env file not being read

Symptoms:



process.env.VARIABLE returns undefined



Application can't connect to database



"Missing environment variable" errors



Solutions:



bash

\# Solution 1: Check if .env exists

ls -la | grep .env



\# Solution 2: Verify dotenv is installed

npm list dotenv



\# Solution 3: Install dotenv if missing

npm install dotenv



\# Solution 4: Check dotenv configuration

\# In server.js, ensure dotenv is loaded early

require('dotenv').config();  // Should be at top



\# Solution 5: Check .env format

\# Correct:

MONGO\_URL=mongodb+srv://user:pass@cluster.mongodb.net/db

\# Incorrect:

MONGO\_URL = mongodb+srv://user:pass@cluster.mongodb.net/db



\# Solution 6: Restart server after .env changes

\# .env changes require server restart

npm run dev

Issue: Environment variables in production not working

Symptoms:



App works in development but not production



Variables from .env not available



Solutions:



bash

\# Solution 1: Set variables in hosting platform

\# Render: Environment Variables in dashboard

\# Heroku: heroku config:set VARIABLE=value



\# Solution 2: Use system environment variables

export MONGO\_URL="mongodb+srv://..."

npm start



\# Solution 3: Create .env on server

\# Add .env file manually on production server

📦 npm \& Package Manager Issues

Issue: Package version conflicts

Symptoms:



text

npm ERR! peer dependency conflict

npm ERR! ERESOLVE unable to resolve dependency tree

Solutions:



bash

\# Solution 1: Use legacy peer deps

npm install --legacy-peer-deps



\# Solution 2: Force installation

npm install --force



\# Solution 3: Update conflicting packages

npm update



\# Solution 4: Install specific versions

npm install express@4.18.2



\# Solution 5: Delete node\_modules and reinstall

rm -rf node\_modules package-lock.json

npm install

Issue: "nodemon: command not found"

Symptoms:



text

nodemon: command not found

Error: cannot find module 'nodemon'

Solutions:



bash

\# Solution 1: Install globally

npm install -g nodemon



\# Solution 2: Use npx

npx nodemon server.js



\# Solution 3: Add to package.json scripts

"scripts": {

&#x20;   "dev": "nodemon server.js"

}

npm run dev



\# Solution 4: Install as dev dependency

npm install --save-dev nodemon

npx nodemon server.js

🗄️ MongoDB Connection Issues

Issue: Cannot connect to MongoDB Atlas

Symptoms:



text

MongoNetworkError: connect ECONNREFUSED

MongooseServerSelectionError: connection timed out

Solutions:



bash

\# Solution 1: Check connection string format

\# Correct format:

mongodb+srv://username:password@cluster.mongodb.net/database-name



\# Solution 2: Whitelist IP address

\# MongoDB Atlas → Network Access → Add IP

\# Add your current IP or 0.0.0.0/0



\# Solution 3: Check credentials

\# Verify username/password in connection string

\# Reset password if needed



\# Solution 4: Check cluster status

\# MongoDB Atlas → Clusters → Check status

\# Ensure cluster is active



\# Solution 5: Use MongoDB Compass to test

\# Test connection string in Compass first

Issue: Authentication failed for MongoDB

Symptoms:



text

MongoError: Authentication failed

MongoError: bad auth Authentication failed

Solutions:



bash

\# Solution 1: Check username and password

\# Note: Special characters in password need URL encoding



\# Solution 2: Reset password in Atlas

\# Users → Your User → Edit → Reset Password



\# Solution 3: Check database name

\# Ensure database exists in the connection string

mongodb+srv://user:pass@cluster.mongodb.net/aarogya



\# Solution 4: Create database user with proper privileges

\# Database Access → Add New User

\# Role: readWriteAnyDatabase or readWrite

Issue: Connection timeout

Symptoms:



text

MongooseServerSelectionError: Connection timed out

Solutions:



javascript

// Solution 1: Increase timeout settings

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO\_URL, {

&#x20;   serverSelectionTimeoutMS: 30000,  // Increase timeout

&#x20;   socketTimeoutMS: 45000

});



// Solution 2: Check network/firewall

// Ensure ports 27017 and 27018 are open



// Solution 3: Use direct connection (not recommended)

mongodb://username:password@host:port/database

🖥️ Server \& Node.js Issues

Issue: Server not starting

Symptoms:



text

Error: Cannot find module

Error: listen EADDRINUSE

Server stops after a few seconds

Solutions:



bash

\# Solution 1: Check for syntax errors

node server.js  # Run without nodemon



\# Solution 2: Check port availability

lsof -i :5000

kill -9 PID  # Kill process using port



\# Solution 3: Check Node version

node --version  # Should be v18+



\# Solution 4: Check all imports

\# Ensure all required modules are installed

npm install



\# Solution 5: Check for circular dependencies

\# Use madge to detect circular dependencies

npx madge --circular server.js

Issue: Server crashes randomly

Symptoms:



Server stops without error



"Process exited with code 0/1"



Solutions:



bash

\# Solution 1: Use nodemon with verbose

nodemon --verbose server.js



\# Solution 2: Add try-catch for all async operations

try {

&#x20;   await someAsyncOperation();

} catch (error) {

&#x20;   console.error('Error:', error);

}



\# Solution 3: Add global error handler

process.on('uncaughtException', (error) => {

&#x20;   console.error('Uncaught Exception:', error);

});



\# Solution 4: Check for memory leaks

\# Use --max-old-space-size flag

node --max-old-space-size=4096 server.js

🌐 Port \& Network Issues

Issue: Port 5000 already in use

Symptoms:



text

Error: listen EADDRINUSE: address already in use :::5000

Solutions:



bash

\# Solution 1: Find and kill process (Mac/Linux)

lsof -i :5000

kill -9 PID



\# Solution 2: Find and kill process (Windows)

netstat -ano | findstr :5000

taskkill /PID PID /F



\# Solution 3: Use different port

PORT=5001 npm run dev



\# Solution 4: Update .env

PORT=5001

Issue: CORS errors

Symptoms:



text

Access to XMLHttpRequest has been blocked by CORS policy

No 'Access-Control-Allow-Origin' header

Solutions:



javascript

// Solution 1: Enable CORS properly

const cors = require('cors');

app.use(cors({

&#x20;   origin: true,

&#x20;   credentials: true

}));



// Solution 2: Allow specific origins

app.use(cors({

&#x20;   origin: 'https://your-frontend.com',

&#x20;   credentials: true

}));



// Solution 3: Allow all origins (development only)

app.use(cors({

&#x20;   origin: '\*'

}));



// Solution 4: Handle preflight requests

app.options('\*', cors());

🔐 Authentication \& Authorization Issues

Issue: Cannot login

Symptoms:



"No account found" error



"Incorrect password" error



Redirects back to login



Solutions:



javascript

// Solution 1: Check user exists

const user = await User.findOne({ email: req.body.email });

console.log('User found:', user);



// Solution 2: Check password hashing

const hashed = await bcrypt.hash(password, 10);

const match = await bcrypt.compare(password, hashed);

console.log('Password match:', match);



// Solution 3: Check JWT\_SECRET

console.log('JWT\_SECRET:', process.env.JWT\_SECRET);



// Solution 4: Clear browser cookies

// Chrome: F12 → Application → Cookies → Clear



// Solution 5: Check session cookie

res.cookie('token', token, {

&#x20;   httpOnly: true,

&#x20;   secure: process.env.NODE\_ENV === 'production',

&#x20;   maxAge: 3600000

});

Issue: JWT token expired

Symptoms:



"Unauthorized" errors



Redirected to login after short time



Solutions:



javascript

// Solution 1: Increase token expiration

const token = jwt.sign(

&#x20;   { id: user.\_id },

&#x20;   process.env.JWT\_SECRET,

&#x20;   { expiresIn: '7d' }  // 7 days instead of 1 hour

);



// Solution 2: Implement refresh tokens

const refreshToken = jwt.sign(

&#x20;   { id: user.\_id },

&#x20;   process.env.JWT\_REFRESH\_SECRET,

&#x20;   { expiresIn: '30d' }

);



// Solution 3: Check token verification

try {

&#x20;   const decoded = jwt.verify(token, process.env.JWT\_SECRET);

} catch (error) {

&#x20;   if (error.name === 'TokenExpiredError') {

&#x20;       // Handle expired token

&#x20;       return res.status(401).json({ message: 'Token expired' });

&#x20;   }

}

🌐 Browser \& Frontend Issues

Issue: CSS not loading

Symptoms:



Page has no styling



404 errors for CSS files



Solutions:



html

<!-- Solution 1: Check path -->

<!-- Correct -->

<link rel="stylesheet" href="/css/style.css">

<!-- Wrong -->

<link rel="stylesheet" href="css/style.css">



<!-- Solution 2: Use absolute path -->

<link rel="stylesheet" href="/css/style.css">



<!-- Solution 3: Check public directory -->

<!-- Ensure server is serving public folder -->

app.use(express.static('public'));



<!-- Solution 4: Clear browser cache -->

<!-- Ctrl+Shift+Delete → Cached images and files -->

Issue: JavaScript not working

Symptoms:



Console errors



Features not functional



Solutions:



javascript

// Solution 1: Check script path

<script src="/js/script.js" defer></script>



// Solution 2: Use console.log for debugging

console.log('Script loaded');

console.log('Variable:', variable);



// Solution 3: Use try-catch for error handling

try {

&#x20;   // Your code here

} catch (error) {

&#x20;   console.error('Error:', error);

}



// Solution 4: Check for loading order

// Ensure DOM is loaded

document.addEventListener('DOMContentLoaded', function() {

&#x20;   // Your code here

});

💾 Database \& Query Issues

Issue: Query returns empty results

Symptoms:



No data displayed



Empty array returns



Solutions:



javascript

// Solution 1: Add debug logging

const users = await User.find({});

console.log('Total users:', users.length);



// Solution 2: Check field names

// Model: role, Query: { role: 'doctor' }  ✅

// Model: roles, Query: { role: 'doctor' }  ❌



// Solution 3: Check data type

const id = req.params.id;

const user = await User.findById(id);  // ✅

const user = await User.findById(parseInt(id));  // ❌



// Solution 4: Use lean() for plain objects

const users = await User.find({}).lean();



// Solution 5: Check database connection

console.log('MongoDB Connection:', mongoose.connection.readyState);

Issue: Database query is slow

Symptoms:



Pages load slowly



API endpoints taking too long



Solutions:



javascript

// Solution 1: Add indexes

UserSchema.index({ email: 1 });

UserSchema.index({ role: 1, specialization: 1 });

AppointmentSchema.index({ doctor: 1, date: -1 });



// Solution 2: Use lean()

const users = await User.find({}).lean();



// Solution 3: Use select() for specific fields

const users = await User.find({})

&#x20;   .select('name email role');



// Solution 4: Use limit() for large results

const users = await User.find({})

&#x20;   .limit(50);



// Solution 5: Use aggregation for complex queries

const appointments = await Appointment.aggregate(\[

&#x20;   { $match: { doctor: doctorId } },

&#x20;   { $limit: 100 },

&#x20;   { $sort: { date: -1 } }

]);

🛠️ Git \& Version Control Issues

Issue: Merge conflicts

Symptoms:



text

CONFLICT (content): Merge conflict in file.js

Automatic merge failed; fix conflicts and then commit

Solutions:



bash

\# Solution 1: Check status

git status



\# Solution 2: Open conflicted files

\# Look for <<<<<<< HEAD and >>>>>>> branch-name



\# Solution 3: Resolve manually

\# Edit file to keep correct changes



\# Solution 4: After resolving

git add .

git commit -m "Resolved merge conflicts"



\# Solution 5: Use merge tool

git mergetool

Issue: Cannot push to remote

Symptoms:



text

error: failed to push some refs

Updates were rejected because the remote contains work

Solutions:



bash

\# Solution 1: Pull latest changes

git pull upstream develop



\# Solution 2: Rebase your changes

git rebase develop



\# Solution 3: Force push (use with caution)

git push origin feature/your-feature --force



\# Solution 4: Check remote URL

git remote -v

git remote set-url origin https://github.com/your-username/repo.git

📞 Quick Reference

Common Commands

Issue	Command

Clear npm cache	npm cache clean --force

Kill process on port	lsof -i :5000 \&\& kill -9 PID

Check Node version	node --version

Check MongoDB status	mongo --eval "db.stats()"

Check Git status	git status

Delete node\_modules	rm -rf node\_modules

Reinstall dependencies	npm install

Error Codes Quick Fix

Error	Quick Fix

EADDRINUSE	Kill process on port

MongoNetworkError	Check IP whitelist

ERESOLVE	Use --legacy-peer-deps

MODULE\_NOT\_FOUND	Reinstall dependencies

JWT\_SECRET	Set in .env file

🤝 Still Need Help?

Support Channels

GitHub Issues: Create new issue



Discord Community: Chat with the team



Email Support: aarogya-support@health.com



When Creating an Issue

Provide clear description



Include error logs



Share steps to reproduce



Mention environment details



Add screenshots if helpful



We're here to help! 🚀





