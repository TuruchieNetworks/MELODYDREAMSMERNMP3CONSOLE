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
  res.clearCookie('userToken');
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