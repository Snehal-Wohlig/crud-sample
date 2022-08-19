const express = require("express");
const router = new express.Router(); //create a new router
const Studentds = require("../models/students");

// wee need to define a router
router.post("/student", async (req, res) => {
  try {
    const user = new Studentds(req.body);
    console.log("New Student Document Added", req.body);
    const createUser = await user.save();
    res.status(201).send(createUser);
    // console.log("New Student Document Added", createUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/student", async (req, res) => {
  try {
    let { page, size, sort } = req.query;
    if (!page) {
      page = 1;
    }
    if (!size) {
      size = 10;
    }
    const limit = parseInt(size);

    const getUser = await Studentds.find()
      .sort({ votes: 1, _id: -1 })
      .limit(limit);
    //   .pretty();

    res.send({ page, size, Info: getUser });

    console.log("All Students Data", getUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/student/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const getUser = await Studentds.findById({ _id: id });
    console.log(`Get All Details To This Student ${getUser}`);
    res.send(getUser);
  } catch (err) {
    res.status(404).send(err);
  }
});

router.patch("/student/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const patchUser = await Studentds.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    console.log("All Update is done", patchUser);
    res.send(patchUser);
  } catch (err) {
    res.status(404).send(err);
  }
});

router.delete("/student/:id", async (req, res) => {
  try {
    //const id = req.params.id;
    const deleteStudent = await Studentds.findByIdAndDelete(req.params.id);
    if (!req.params.id) {
      return res.status(404).send();
    }
    // console.log(deleteStudent);
    console.log("Student Document Deleted", deleteStudent);
    res.send(deleteStudent);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
