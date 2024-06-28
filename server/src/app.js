const express = require('express');
const app = express();

const cors = require('cors');
const usersRoutes = require('../routes/users.routes');

const port = 8000;

app.use(cors());
app.use(express.json());
app.use('/api/users', usersRoutes);

// Iniciar el servidor
app.listen(port, () => {
	console.log(`El servidor esta funcionando en el puerto ${port}`);
});
