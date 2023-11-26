const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const dbName = process.env.DB;
const multer = require('multer');
const songController = require('./controllers/song.controller');
const { authenticate } = require('./config/jwt');

// Set up the storage for multer
const storage = multer.memoryStorage(); // You can adjust this based on your needs
const upload = multer({ storage: storage });

// MIDDLEWARE
app.use(cookieParser());

// Use the cors middleware with specific configuration
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
    exposedHeaders: ['Access-Control-Allow-Origin']
  })
);

// ROUTES
const router = express.Router(); // Create a router instance

// Attach the /songs route to the router
require('./routes/user.routes')(app);
router.post('/songs', authenticate, upload.single('file'), songController.createNewSong);


app.use('/api', router); 

require('./config/mongoose.config');

app.listen(PORT, () => console.log(` >>>📡 API SERVICE ANNOUNCEMENT: 🎡🎠🎡 Server is up and running on port: ${PORT} and listening for REQuests to RESpond to 💻💻💻 >>>`));