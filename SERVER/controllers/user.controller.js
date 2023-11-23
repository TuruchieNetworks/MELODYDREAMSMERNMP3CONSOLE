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
// module.exports.createNewUser = (req, res) => {
//   User.create(req.body)
//     .then(user => {
//       const userToken = jwt.sign({ id: user._id }, SECRET_KEY);
//       res
//         .cookie("usertoken", userToken, { httpOnly: true })
//         .json({ msg: "User Successfully Identified!", user: { _id: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName, avatar: user.avatar } });

//     })
//     .catch(err => res.json(err));
// }



// CREATE NEW
// module.exports.createNewUser = (req, res) => {
//   User.create(req.body)
//   console.log(req.body)
//     .then(user => {
//       if (!user) {
//         // Handle the case where user creation fails
//         return res.status(500).json({ error: 'User creation failed' });
//       }

//       const userToken = jwt.sign(
//         { id: user._id },
//         process.env.SECRET_KEY
//       );

//       res.cookie( {
//         userToken, 
//         httpOnly: true,
//         // Add other cookie options if needed (e.g., secure: true for HTTPS)
//       })

//       res.json({ msg: "success!", user: user });
//     })
//     .catch(err => {
//       if (err.code === 11000) {
//         // Duplicate key error (email already exists)
//         return res.status(400).json({ error: 'Email is already in use.' });
//       }
//       res.status(500).json({ error: 'Internal Server Error' });
//     });
// };
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

// module.exports.loginUser = async (req, res) => {
//   const user = await User.findOne({ email: req.body.email });

//   if (user === null) {
//     // email not found in users collection
//     return res.sendStatus(404);
//   }

//   // if we made it this far, we found a user with this email address
//   // let's compare the supplied password to the hashed password in the database
//   const correctPassword = await bcrypt.compare(req.body.password, user.password);

//   if (!correctPassword) {
//     // password wasn't a match!
//     return res.sendStatus(401);
//   }

//   // if we made it this far, the password was correct
//   // const userToken = jwt.sign({
//   //   id: user._id
//   // }, process.env.SECRET_KEY);

//   const userToken = jwt.sign(
//     { id: user._id },
//     process.env.SECRET_KEY,
//     { expiresIn: '1h' } // Set the expiration time as needed
//   );

//   // Define the 'secret' variable with an appropriate value
//   const secret = 'your-secret-key'; // replace with your actual secret key

//   // note that the response object allows chained calls to cookie and json
//   res.cookie("usertoken", userToken, secret, {
//     httpOnly: true
//   })
//     .json({ msg: "success!" });
// }

// LOGIN
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

// // LOG OUT
// module.exports.logout = (req, res) => {
//   res.clearCookie('userToken');
//   res.sendStatus(200);
// }

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