const express = require('express');
require('./db/conn');
const Studentds = require('./models/students');

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.post('/student', async (req, res) => {
  try {
    const user = new Studentds(req.body);
    //   console.log(req.body);
    const createUser = await user.save();
    console.log(req.body);
    res.status(201).send(createUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get('/student', async (req, res) => {
  try {
    const getUser = await Studentds.find();
    res.send(getUser);
    console.log(req.body);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get('/student/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const getUser = await Studentds.findById({ _id: id });

    console.log(getUser);
    res.send(getUser);
  } catch (err) {
    res.status(404).send(err);
  }
});

app.patch('/student/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const patchUser = await Studentds.findByIdAndUpdate({_id : id}, req.body);

    console.log(patchUser);
    res.send(patchUser);
    new true;
  } catch (err) {
    res.status(404).send(err);
  }
});

app.delete('/student/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const deleteUser = await Studentds.findByIdAndUpdate({_id : id}, req.body);
  
      console.log(deleteUser);
      res.send(deleteUser);
    } catch (err) {
      res.status(404).send(err);
    }
  });

app.listen(port, () => {
  console.log(`Connection is live at port number ${port}`);
});
