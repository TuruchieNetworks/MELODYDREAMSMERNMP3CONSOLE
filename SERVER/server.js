const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const dbName = process.env.DB;
// MIDDLEWARE
// app.use(express.json({ extended: false })); // this allows to get data from req.body
app.use(cookieParser());

// app.use(express.json(), express.urlencoded({ extended: true }), cors({ credentials: true, origin: 'http://localhost:3000' }));

app.use(
  express.json(),
  express.urlencoded({ extended: true }),
  cors({ credentials: true, origin: 'http://127.0.0.1:3000' })
);

// Change the app.use(cors()) to the one below
// app.use(cors({credentials: true, origin: 'http://localhost:3000'}));


// require('./config/mongoose.config')(dbName);

require('./config/mongoose.config');

// ROUTES
require('./routes/user.routes')(app);


app.listen(PORT, () => console.log(` >>>📡 API SERVICE ANNOUNCEMENT: 🎡🎠🎡 Server is up and running on port: ${PORT} and listening for REQuests to RESpond to 💻💻💻 >>>`));