const User = require('../models/user.model');
const SECRET_KEY = process.env.SECRET_KEY;
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");

//  READ ALL
module.exports.findAllUsers = (req, res) => {
  User.find()
    .then((allDaUsers) => {
      // Here is what we wil be sending to react
      res.json({ users: allDaUsers })
    })
    .catch((err) => {
      res.json(err)
    });
}

// READ ONE 
module.exports.findOneSingleUser = (req, res) => {
  User.findOne({ _id: req.params.id })
    .then(oneSingleUser => {
      res.json({ user: oneSingleUser })
    })
    .catch((err) => {
      res.json(err)
    });
}

// CREATE NEW
module.exports.createNewUser = (req, res) => {
  User.create(req.body)
    .then(user => {
      const userToken = jwt.sign({
        id: user._id
      }, process.env.SECRET_KEY);

      res
        .cookie("userToken", userToken, {
          httpOnly: true
        })
        .json({ msg: "success!", user: user });
    })
    .catch(err => res.json(err));
}

// ADD SONG
module.exports.createNewSong = async (req, res) => {
  try {
    const { songName, songDescription, songArtist, genre, likes, songData } = req.body;
    const userId = req.user._id; // incase of middleware setting req.user

    await addSong(userId, { songName, songDescription, songArtist, genre, likes, ...songData });

    res.json({ msg: 'Song added successfully' });
  } catch (error) {
    console.error('Error creating song:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


//  UPDATE SONG
module.exports.createNewSong = async (req, res) => {
  try {
    const { title, description, owner, genre, likes, songImage } = req.body;
    const userId = req.user._id;

    // Get the file buffer from multer
    const fileBuffer = req.file.buffer;

    // Handle the file as needed (store in S3, save to disk, etc.)
    // For simplicity, let's assume saving to disk
    // You should replace this with your actual file storage logic
    const filePath = `/path/to/save/${req.file.originalname}`;
    // Save the file to disk or upload to S3

    // Now, you can use filePath in your MongoDB update logic
    const songData = {
      title,
      description,
      owner,
      genre,
      likes,
      songImage,
      filePath, // Adjust this based on your file storage solution
    };

    await addSong(userId, songData);

    res.json({ msg: 'Song added successfully' });
  } catch (error) {
    console.error('Error creating song:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


//  DELETE SONG
module.exports.deleteExistingSong = (req, res) => {
  User.song.deleteOne({ _id: req.params.id })
    .then(result => {
      res.json({ result: result })
    })
    .catch((err) => {
      res.json(err)
    });
}

//  UPDATE USER
module.exports.updateExistingUser = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true, runValidators: true }
  )
    .then(updatedUser => {
      res.json({ user: updatedUser })
    })
    .catch((err) => {
      res.status(400).json(err)
    });
}

// DELETE
module.exports.deleteAnExistingUser = (req, res) => {
  User.deleteOne({ _id: req.params.id })
    .then(result => {
      res.json({ result: result })
    })
    .catch((err) => {
      res.json(err)
    });
}

// EACH CRUDS INDIVIDUALLY EXPORTED!

// LOGIN
module.exports.loginUser = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (user === null) {
    return res.sendStatus(404);
  }

  const correctPassword = await bcrypt.compare(req.body.password, user.password);

  if (!correctPassword) {
    return res.sendStatus(401);
  }

  console.log('SECRET_KEY:', SECRET_KEY);
  const userToken = jwt.sign(
    { id: user._id },
    SECRET_KEY,
    { expiresIn: '1h' } // Set the expiration time as needed
  );

  const secret = 'your-secret-key';
  res.cookie("userToken", userToken, {
    httpOnly: true
  })
    .json({ msg: "success!" });
}

// LOG OUT
module.exports.logout = (req, res) => {
  res.clearCookies('userToken');
  res.sendStatus(200);
}
// notice that we're using the SECRET_KEY from our .env file
// AUTHENTICATE
module.exports.authenticate = (req, res, next) => {
  jwt.verify(req.cookies.userToken, process.env.SECRET_KEY, (err, payload) => {
    if (err) {
      res.status(401).json({ verified: false });
    } else {
      next();
    }
  });
}