const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
  },

  firstName: {
    type: String,
    required: [true, "{PATH} is required"],
    minLength: [3, "{PATH} must have at least 3 Characters"],
  },

  lastName: {
    type: String,
    required: [true, "{PATH} is required"],
    minLength: [3, "{PATH} must have at least 3 Characters!"],
  },

  email: {
    type: String,
    required: [true, "{PATH} is required!"],
    minLength: [3, "{PATH} must have at least 3 Characters"],
    unique: true,
    validate: {
      validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
      message: "Please enter a valid email!",
    },
  },

  password: {
    type: String,
    required: [true, "{PATH} is required"],
    minLength: [3, "{PATH} must have at least 3 Characters"],
  },

  avatar: {
    type: String,
  },

  songs: {
    song: {
      song_id: {
        type: String,
      },

      songTitle: {
        type: String,
        minLength: [2, "{PATH} must have at least 2 Characters"],
      },

      songArtist: {
        type: String,
      },

      songDescription: {
        type: String,
      },

      songImage: {
        imageData: {
          type: String,
        },
        filePath: {
          type: String,
        },
      },

      songData: {
        type: String,
        required: [true, "{PATH} is required"],
      },

      genre: {
        type: String,
      },

      likes: {
        type: Number,
      },
    },
  },
}, { timestamps: true });
