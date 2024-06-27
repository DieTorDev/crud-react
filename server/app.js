const express = require('express');
const { v4 } = require('uuid');
const app = express();

const fsPromises = require('fs/promises');
const path = require('path');
const cors = require('cors');

const port = 8000;

app.use(cors());
app.use(express.json());

const filePath = path.resolve(__dirname, 'data/users.json');

console.log(filePath);

app.get('/', async (req, res) => {
	try {
		const data = await fsPromises.readFile(filePath);
		const jsonData = await JSON.parse(data);
		res.send(jsonData);
	} catch (err) {
		console.log(err);
	}
	res.end();
});

app.post('/', async (req, res) => {
	const newUser = { id: v4(), ...req.body };
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
});

app.patch('/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const data = await fsPromises.readFile(filePath);
		const jsonData = await JSON.parse(data);

		const updateUsers = jsonData.map(user => {
			if (user.id === id) {
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
});

app.delete('/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const data = await fsPromises.readFile(filePath);
		const jsonData = await JSON.parse(data);

		const updateUsers = jsonData.filter(user => user.userId !== id);
		fsPromises.writeFile(filePath, JSON.stringify(updateUsers));
		console.log(updateUsers);
		res.send(updateUsers);
	} catch (err) {
		console.log(err);
	}
	res.end();
});

// Iniciar el servidor
app.listen(port, () => {
	console.log(`El servidor esta funcionando en el puerto ${port}`);
});
