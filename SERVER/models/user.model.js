const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Model Schema for Users
const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
  },

  firstName: {
    type: String,
    required: [true, "{PATH} is required"],
    minLength: [3, "{PATH} must have at least 3 Characters"]
  },

  lastName: {
    type: String,
    required: [true, "{PATH} is required"],
    minLength: [3, "{PATH} must have at least 3 Characters!"]
  },

  email: {
    type: String,
    required: [true, "{PATH} is required!"],
    minLength: [3, "{PATH} must have at least 3 Characters"],
    unique: true,
    validate: {
      validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
      message: "Please enter a valid email!"
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

// // add this after UserSchema is defined
// UserSchema.virtual('confirmPassword')
//   // Make a virtual schema for confirmpassword
//   .get(function () {
//     return this._confirmPassword;
//   })
//   // Set the values from the form
//   .set(function (value) {
//     this._confirmPassword = value;
//   });

// // Note: avoid rewriting the callback function using an arrow function as it will not have the correct scope for this
// //  .Pre meaning: before you save to the database
// // Next is the next step
// UserSchema.pre('validate', function (next) {
//   if (this.password !== this.confirmPassword) {
//     console.log('Pre-validate middleware is running');
//     this.invalidate('confirmPassword', 'Password must match!');
//   }
//   // Perform whatever next step you had in program chain
//   next();
// });

// // BYCRYPT before saving to DB, run this function!
// UserSchema.pre('save',
//   function (next) {
//     console.log('Pre-save middleware is running');
    
//     bcrypt.hash(this.password, 10)
//       //  .then means its successful
//       .then(hash => {
//         this.password = hash;
//         next()
//       })
//       .catch(err => {
//         console.log('Error Hashing Password!', err)
//         next()
//       })
//   });
// // const salt = await bcrypt.genSalt(10)
// // User.password =await bcrypt.hash(password, salt)
// // await user.save();
// module.exports = User;
// const User = mongoose.model('User', UserSchema);
// In this modification, the pre('save') middleware is now an async function, and it uses await to generate a salt and hash the password before saving it to the database. If any error occurs during the hashing process, it will be caught and passed to the next function, preventing the save operation from proceeding.
UserSchema.virtual('confirmPassword')
  .get(function () {
    return this._confirmPassword;
  })
  .set(function (value) {
    this._confirmPassword = value;
  });

UserSchema.pre('validate', function (next) {
  if (this.password !== this.confirmPassword) {
    console.log('Pre-validate middleware is running');
    this.invalidate('confirmPassword', 'Password must match!');
  }
  next();
});

UserSchema.pre('save', async function (next) {
  console.log('Pre-save middleware is running');
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    console.log('Error Hashing Password!', err);
    next(err);
  }
});

const User = mongoose.model('User', UserSchema);


module.exports = User;






