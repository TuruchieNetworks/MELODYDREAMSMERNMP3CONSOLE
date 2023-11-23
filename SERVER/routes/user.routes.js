const UserController = require('../controllers/user.controller');
const { authenticate } = require('../config/jwt');

module.exports = app => {
  // No authorization required for user creation
  app.post('/api/users', UserController.createNewUser);

  // Authentication reserverd for the following routes
  app.post("/api/login", UserController.loginUser);
  app.get("/api/users", UserController.findAllUsers);
  app.get('/api/users/:id', authenticate, UserController.findOneSingleUser);
  app.patch('/api/users/:id', authenticate, UserController.updateExistingUser);
  app.delete('/api/users/:id', authenticate, UserController.deleteAnExistingUser);

  //  Song Routes
  app.post('/api/songs', authenticate, SongController.createNewSong);
  app.get('/api/songs', authenticate, SongController.findAllSongs);
  app.get('/api/songs/:id', authenticate, SongController.findOneSingleSong);
  app.patch('/api/songs/:id', authenticate, SongController.updateExistingSong);
  app.delete('/api/songs/:id', authenticate, SongController.deleteAnExistingSong);
}