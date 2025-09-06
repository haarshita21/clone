backend folder setup:
backend/
├── config/
│   └── database.js
├── controllers/
│   ├── authController.js
│   ├── postController.js
│   ├── userController.js
│   └── uploadController.js
├── middleware/
│   ├── auth.js
│   └── upload.js
├── models/
│   ├── User.js
│   ├── Post.js
│   └── Conversation.js
├── routes/
│   ├── auth.js
│   ├── posts.js
│   ├── users.js
│   └── upload.js
├── uploads/
│   ├── avatars/
│   └── media/
├── .env
├── package.json
└── server.js

commands to run on bash
mkdir backend
cd backend
npm init -y
npm install express mongoose bcryptjs jsonwebtoken multer cors dotenv
npm install -D nodemon

then open mongodb
and prompt bash to: npm install
then:npm run dev


> backend@1.0.0 dev
> nodemon server.js

[nodemon] 3.1.10
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node server.js`
[dotenv@17.2.2] injecting env (3) from .env -- tip: 🛠️  run anywhere with `dotenvx run -- yourcommand`
Server running on port 5000
MongoDB Connected: localhost
**** this should appear, then open index.html with live server
