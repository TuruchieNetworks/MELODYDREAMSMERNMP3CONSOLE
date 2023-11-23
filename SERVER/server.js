const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const dbName = process.env.DB;
const multer = require('multer');
const songController = require('./controllers/user.controller');
const authMiddleware = require('../middlewares/authMiddleware');

// Set up the storage for multer
const storage = multer.memoryStorage(); // You can adjust this based on your needs
const upload = multer({ storage: storage });

// MIDDLEWARE
app.use(cookieParser());

app.use(
  express.json(),
  express.urlencoded({ extended: true }),
  cors({ credentials: true, origin: 'http://127.0.0.1:3000' })
);

// ROUTES
const router = express.Router(); // Create a router instance

// Attach the /songs route to the router
router.post('/songs', authMiddleware.authenticate, upload.single('file'), userController.createNewSong);

// Use the router in your app
app.use('/api', router); // You can adjust the base path as needed

require('./config/mongoose.config');

app.listen(PORT, () => console.log(` >>>📡 API SERVICE ANNOUNCEMENT: 🎡🎠🎡 Server is up and running on port: ${PORT} and listening for REQuests to RESpond to 💻💻💻 >>>`));