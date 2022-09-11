const UserController = require('../controllers/user.controller');

module.exports = app => {
  app.get('/api/users', UserController.allUsers);
  app.get('/api/users/:id', UserController.oneUser);
  app.post('/api/new_user', UserController.newUser);
  app.put('/api/users/:id/update', UserController.updateUser);
  app.delete('/api/users/:id/delete', UserController.deleteUser);
}