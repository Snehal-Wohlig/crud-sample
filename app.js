const express = require("express");
require("./db/conn");
const Studentds = require("./models/students");
const studentRouter = require("./routers/route");

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(studentRouter);

// // create a new router
// const router = new express.Router();

// // wee need to define a router
// router.get("/", (req, res) => {
//   res.send("welcome");
// });

// //  we need to resister router
// app.use(router);

// app.post("/student", async (req, res) => {
//   try {
//     const user = new Studentds(req.body);
//     console.log("New Student Document Added", req.body);
//     const createUser = await user.save();
//     res.status(201).send(createUser);
//     // console.log("New Student Document Added", createUser);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

// app.get("/student", async (req, res) => {
//   try {
//     const getUser = await Studentds.find();
//     res.send(getUser);
//     console.log("All Students Data", getUser);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

// app.get("/student/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const getUser = await Studentds.findById({ _id: id });

//     console.log(`Get All Details To This Student ${getUser}`);
//     res.send(getUser);
//   } catch (err) {
//     res.status(404).send(err);
//   }
// });

// app.patch("/student/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const patchUser = await Studentds.findByIdAndUpdate(id, req.body, {
//       new: true,
//     });
//     console.log("All Update is done", patchUser);
//     res.send(patchUser);
//   } catch (err) {
//     res.status(404).send(err);
//   }
// });

// app.delete("/student/:id", async (req, res) => {
//   try {
//     //const id = req.params.id;
//     const deleteStudent = await Studentds.findByIdAndDelete(req.params.id);
//     if (!req.params.id) {
//       return res.status(404).send();
//     }
//     // console.log(deleteStudent);
//     console.log("Student Document Deleted", deleteStudent);
//     res.send(deleteStudent);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

app.listen(port, () => {
  console.log(`Connection is live at port number ${port}`);
});
