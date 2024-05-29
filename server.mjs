import express from 'express';
import bodyParser from 'body-parser';
import JuanHerrea from './models/juanherrea.js'; 

const app = express();
app.use(bodyParser.json());


// Rutas
app.post('/users', async (req, res) => {
    try {
        const newUser = await juanherrea.create(req.body);
        res.json(newUser);
    } catch (error) {
        res.status(400).send(error);
    }
});
 
app.get('/users', async (req, res) => {
    try {
        const users = await juanherrea.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).send(error);
    }
});
 
app.put('/users/:id', async (req, res) => {
  try {
      const id = req.params.id;
      const [updated] = await juanherrea.update(req.body, {
          where: { id: id }
      });
      if (updated) {
          const updatedUser = await juanherrea.findOne({ where: { id: id } });
          res.status(200).json(updatedUser);
      } else {
          res.status(404).send("User not found");
      }
  } catch (error) {
      res.status(500).send(error);
  }
});
 
app.delete('/users/:id', async (req, res) => {
  try {
      const id = req.params.id;
      const deleted = await juanherrea.destroy({
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
