# notes-api
Node.js REST API for managing notes. Still in development.

## Tools, technologies
Build with Express, with JWT authentication, bcrypt.js, and MongoDB with Mongoose ODM. 
Test suite created with Mocha and Chai.

## Features
After signing in you can create/update/delete your notes. Besides that you are given ability to share individual notes with everyone by giving them a sharable link. Shared notes are availble to see for everyone with a link, but only author of that notes can edit them. You can unshare notes at any time, or set a timeout after wich they will be no longer availble.

## Todo
* making a todo...