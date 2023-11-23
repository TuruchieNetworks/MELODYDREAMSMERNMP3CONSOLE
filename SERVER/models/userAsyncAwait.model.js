const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Model Schema for Users
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "{PATH} is required"],
    minLength: [3, "{PATH} must have at least 3 Characters"]
  },

  lastName: {
    type: String,
    required: [true, "{PATH} is required"],
    minLength: [3, "{PATH} must have at least 3 Characters"]
  },

  email: {
    type: String,
    required: [true, "{PATH} is required"],
    minLength: [3, "{PATH} must have at least 3 Characters"],
    unique: true,
    validate: {
      validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
      message: "Please enter a valid email"
    }
  },

  password: {
    type: String,
    required: [true, "{PATH} is required"],
    minLength: [3, "{PATH} must have at least 3 Characters"]
  },

  avatar: {
    type: String,
  },
}, { timestamps: true });

// Virtual field for confirming password
UserSchema.virtual('confirmPassword')
  .get(() => this._confirmPassword)
  .set(value => this._confirmPassword = value);

// Middleware for validating confirm password
UserSchema.pre('validate', function (next) {
  if (this.isNew && this.password !== this.confirmPassword) {
    this.invalidate('confirmPassword', 'Password must match confirm password');
  }
  next();
});

// Middleware for hashing password before saving
UserSchema.pre('save', async function(next) {
  try {
    if (this.isModified('password')) {
      const hash = await bcrypt.hash(this.password, 10);
      this.password = hash;
    }
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
