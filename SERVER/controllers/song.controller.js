const User = require('../models/user.model');
const multer = require('multer');
const upload = multer(); 
const SECRET_KEY = process.env.SECRET_KEY;
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); // Set the path where you want to store files locally
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// ADD SONG
module.exports.createNewSong = async (req, res) => {
  try {
    const { songTitle, songDescription, songArtist, genre, likes } = req.body;
    const userId = req.user._id; // Assuming you have middleware setting req.user

    // Get the file buffers from multer
    const trackBuffer = req.files['track'][0].buffer;
    const imageBuffer = req.files['songImage'][0].buffer;

    // Handle the files as needed (store in S3, save to disk, etc.)
    // For simplicity, let's assume saving to disk
    // You should replace this with your actual file storage logic
    const trackFilePath = `/path/to/save/${req.files['track'][0].originalname}`;
    const imageFilePath = `/path/to/save/${req.files['songImage'][0].originalname}`;
    // Save the files to disk or upload to S3

    // Now, you can use filePath in your MongoDB update logic
    const songData = {
      song_id: new mongoose.Types.ObjectId(), // Generate a new ObjectId for the song
      songTitle,
      songDescription,
      songArtist,
      genre,
      likes,
      track: trackFilePath,
      songImage: {
        imageData: imageBuffer.toString('base64'),
        filePath: imageFilePath,
      },
      songData: trackBuffer.toString('base64'), // Assuming this is binary data (you may need to adjust accordingly)
    };

    // Add the new song to the user's songs array
    await User.updateOne(
      { _id: userId },
      { $push: { 'songs.song': songData } }
    );

    res.json({ msg: 'Song added successfully' });
  } catch (error) {
    console.error('Error creating song:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
// READ ALL SONGS
module.exports.findAllSongs = (req, res) => {
  User.find()
    .then((allDaSongs) => {
      // Here is what we wil be sending to react
      res.json({ songs: allDaSongs })
    })
    .catch((err) => {
      res.json(err)
    });
}

// READ ONE SONG
module.exports.findOneSingleSong = (req, res) => {
  User.findOne({ 'songs.song._id': req.params.id })
    .then(oneSingleSong => {
      res.json({ song: oneSingleSong })
    })
    .catch((err) => {
      res.json(err)
    });
}

// UPDATE SONG
module.exports.updateExistingSong = async (req, res) => {
  try {
    const { songName, songDescription, songArtist, genre, likes } = req.body;
    const songId = req.params.id;

    // Assuming you have middleware setting req.user
    const userId = req.user._id;

    // Get the file buffers from multer (if needed)
    const trackBuffer = req.files && req.files['track'] ? req.files['track'][0].buffer : undefined;
    const imageBuffer = req.files && req.files['songImage'] ? req.files['songImage'][0].buffer : undefined;

    // Handle the files as needed (store in S3, save to disk, etc.)
    // For simplicity, let's assume saving to disk
    // You should replace this with your actual file storage logic
    const trackFilePath = trackBuffer ? `/path/to/save/${req.files['track'][0].originalname}` : undefined;
    const imageFilePath = imageBuffer ? `/path/to/save/${req.files['songImage'][0].originalname}` : undefined;
    // Save the files to disk or upload to S3

    // Prepare the updated song data
    const updatedSongData = {
      $set: {
        'songs.song.$.songName': songName,
        'songs.song.$.songDescription': songDescription,
        'songs.song.$.songArtist': songArtist,
        'songs.song.$.genre': genre,
        'songs.song.$.likes': likes,
        'songs.song.$.track': trackFilePath,
        'songs.song.$.imageData': imageBuffer ? imageBuffer.toString('base64') : undefined,
        'songs.song.$.songImage.filePath': imageFilePath,
      },
    };

    // Find and update the song based on user ID and song ID
    const updatedSong = await User.findOneAndUpdate(
      { _id: userId, 'songs.song._id': songId },
      updatedSongData,
      { new: true, runValidators: true }
    );

    res.json({ song: updatedSong });
  } catch (error) {
    console.error('Error updating song:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// DELETE SONG
module.exports.deleteExistingSong = (req, res) => {
  User.updateOne(
    { 'songs.song._id': req.params.id },
    { $pull: { 'songs.song': { _id: req.params.id } } }
  )
    .then(result => {
      res.json({ result: result })
    })
    .catch((err) => {
      res.json(err)
    });
}