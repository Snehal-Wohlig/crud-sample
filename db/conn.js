const mongoose = require("mongoose");
const db =
  "mongodb+srv://dbStudentsapi:Wohlig123@cluster0.36bva18.mongodb.net/studentsapi?retryWrites=true&w=majority";

mongoose
  .connect(db)
  .then(() => {
    console.log("connection done");
  })
  .catch((e) => {
    console.log("connection failed", e);
  });
