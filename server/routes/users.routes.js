const express = require('express');
const usersController = require('../controllers/users.controller');
const usersRoutes = express.Router();

usersRoutes.get('/', usersController.getAllUsers);

usersRoutes.post('/', usersController.postNewUser);

usersRoutes.patch('/:id', usersController.patchUsers);

usersRoutes.delete('/:id', usersController.deleteUsers);

module.exports = usersRoutes;
