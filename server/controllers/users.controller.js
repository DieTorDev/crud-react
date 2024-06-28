const fsPromises = require('fs/promises');
const path = require('path');
const { v4 } = require('uuid');
const filePath = path.resolve(__dirname, '../data/users.json');

const usersController = {};

usersController.getAllUsers = async (req, res) => {
	try {
		const data = await fsPromises.readFile(filePath);
		const jsonData = await JSON.parse(data);
		res.send(jsonData);
	} catch (err) {
		console.log(err);
	}
	res.end();
};

usersController.postNewUser = async (req, res) => {
	const newUser = { userId: v4(), ...req.body };
	try {
		const data = await fsPromises.readFile(filePath);
		const jsonData = await JSON.parse(data);
		jsonData.push(newUser);
		fsPromises.writeFile(filePath, JSON.stringify(jsonData));
		res.send(jsonData);
	} catch (err) {
		console.log(err);
	}
	res.end();
};

usersController.patchUsers = async (req, res) => {
	const { id } = req.params;
	try {
		const data = await fsPromises.readFile(filePath);
		const jsonData = await JSON.parse(data);

		const updateUsers = jsonData.map(user => {
			if (user.userId === id) {
				return { ...user, ...req.body };
			}

			return user;
		});

		fsPromises.writeFile(filePath, JSON.stringify(updateUsers));
		res.send(updateUsers);
	} catch (err) {
		console.log(err);
	}

	res.end();
};

usersController.deleteUsers = async (req, res) => {
	const { id } = req.params;
	try {
		const data = await fsPromises.readFile(filePath);
		const jsonData = await JSON.parse(data);

		const updateUsers = jsonData.filter(user => user.userId !== id);
		fsPromises.writeFile(filePath, JSON.stringify(updateUsers));
		res.send(updateUsers);
	} catch (err) {
		console.log(err);
	}
	res.end();
};

module.exports = usersController;
