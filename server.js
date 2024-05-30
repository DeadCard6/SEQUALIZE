const express = require ('express');
const bodyParser = require ('body-parser');
const  {DataUser}  = require ('./models');
const path = require('path');


const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'Front-ed')));


// Sincronizar el modelo con la base de datos
DataUser.sequelize.sync()
    .then(() => {
        console.log('Database & tables created!');
    })
    .catch(err => {
        console.error('Error syncing database:', err);
    });

// Rutas http://localhost:3000/users
app.post('/users', async (req, res) => {
    try {
        const newUser = await DataUser.create(req.body);
        res.json(newUser);
    } catch (error) {
        console.error('Error al crear el usuario:', error); // Imprime el error en la consola para depuración
        res.status(400).json({
            message: 'Error al crear el usuario',
            error: error.message
        });
    }
});

// Rutas http://localhost:3000/users
app.get('/users', async (req, res) => {
    try {
        const users = await DataUser.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).send(error);
    }
});
// Rutas http://localhost:3000/users/:id
app.put('/users/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const [updated] = await DataUser.update(req.body, {
            where: { id: id }
        });
        if (updated) {
            const updatedUser = await DataUser.findOne({ where: { id: id } });
            res.status(200).json(updatedUser);
        } else {
            res.status(404).send("User not found");
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

// Rutas http://localhost:3000/users/alldata:id
app.put('/users/alldata/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { PrimerApellido, SegundoApellido, PrimerNombre, SegundoNombre, email } = req.body;

        // Actualiza el usuario con los datos proporcionados
        const [updated] = await DataUser.update(
            { PrimerApellido, SegundoApellido, PrimerNombre, SegundoNombre, email },
            { where: { id: id } }
        );

        if (updated) {
            // Si se actualizó, busca y devuelve el usuario actualizado
            const updatedUser = await DataUser.findOne({ where: { id: id } });
            res.status(200).json(updatedUser);
        } else {
            // Si no se encontró el usuario para actualizar, devuelve 404
            res.status(404).send("User not found");
        }
    } catch (error) {
        // En caso de error, devuelve un error 500
        res.status(500).send(error.message);
    }
});


// Rutas http://localhost:3000/users/:id
app.delete('/users/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await DataUser.destroy({
            where: { id: id }
        });
        if (deleted) {
            res.status(204).send("User deleted");
        } else {
            res.status(404).send("User not found");
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
