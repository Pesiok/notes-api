# notes-app
React & Redux SPA App with Node.js REST API for managing notes.

Currently in development. 

## Features
After signing in you can create/update/delete your markdown flavored notes. Besides that you are given ability to share individual notes with everyone by giving them a sharable link. Shared notes are available to see for everyone with a link, but only author can edit them. You can unshare notes at any time, or set a timeout after wich they will be no longer available.

## Tools, technologies, etc.

### Backend:
 Express.js, with JWT authentication, bcrypt.js, and MongoDB with Mongoose ODM. Test suite created with Mocha and Chai. Takes adventages of async/await features.

### Frontend:
React, Redux, React Router (v4), marked.js, SASS.

FrontEnd Branch is still in early development stages....
