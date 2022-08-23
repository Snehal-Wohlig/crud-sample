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

// router.get("/student", async (req, res) => {
//   try {
//     const getUser = await Studentds.find();
//     res.send(getUser);
//     console.log("All Students Data", getUser);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

// router.get("/student", async (req, res) => {
//   let pageNo = parseInt(req.query.pageNo);
//   let size = parseInt(req.query.size);
//   let query = {};
//   if (pageNo < 0 || pageNo === 0) {
//     response = {
//       error: true,
//       message: "invalid page number, should start with 1",
//     };
//     return res.json(response);
//   }
//   query.skip = size * (pageNo - 1);
//   query.limit = size;
//   query.sort = { votes: 1, _id: 1 };
//   // Find some documents
//   Studentds.count({}, function (err, totalCount) {
//     if (err) {
//       response = { error: true, message: "Error fetching data" };
//     }
//     Studentds.find({}, {}, query, function (err, data) {
//       // Mongo command to fetch all data from collection.
//       if (err) {
//         response = { error: true, message: "Error fetching data" };
//       } else {
//         var totalPages = Math.ceil(totalCount / size);
//         response = { pagesNumbers: totalPages, StudentData: data };
//       }
//       res.json(response);
//     });
//   });
//   // Studentds.pretty();
// });

router.get("/student", async (req, res) => {
  try {
    let pageNo = req.query.pageNo || 0;
    let nPerPage = req.query.nPerPage || 2;
    console.log("PAGE::::: ", pageNo);
    // print("Page: " + pageNumber);
    const getstudent = await Studentds.find()
      .sort({ _id: 1 })
      .skip(pageNo > 0 ? (pageNo - 1) * nPerPage : 0)
      .limit(nPerPage);

    // console.log(printStudents());
    res.send(getstudent);
    console.log(getstudent);
  } catch (err) {
    res.status(400).send(err);
  }
});

// router.get("/student", async (req, res) => {
//   try {
//     let { page, size, step, sort } = req.query;
//     if (!page) {
//       page = req.query.page || 1;
//     }
//     if (!size) {
//       size = req.query.limit || 2;
//     }
//     if (!step) {
//       step = req.query.skip || 0;
//     }
//     const limit = parseInt(size);

//     const skip = parseInt(step);

//     const getUser = await Studentds.find()
//       .sort({ votes: 1, _id: -1 })
//       .skip(skip);
//       .limit(limit)

//     //   .pretty();

//     res.send({ page, size, step, Info: getUser });

//     console.log("All Students Data", getUser);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

// router.get("/student", async (req, res) => {
//   try {
//     // let { page, size, step, sort } = req.query;
//     if (!page) {
//       page = req.query.page;
//     }
//     if (!size) {
//       size = req.query.limit;
//     }
//     // if (!step) {
//     //   step = page > 0 ? (page - 1) * size : 0;
//     // }
//     let limit = parseInt(size);

//     // let skip = parseInt(step);
//     // let Studentds = new Studentds();

//     let getUser = await Studentds.find()
//       .sort({ _id: 1 })
//       .limit(limit)
//       .skip(size * (page - 1));
//     //   .pretty();  page > 0 ? (page - 1) * size : 0; size * (pageNo - 1

//     res.send({ page, size, step, Info: getUser });

//     console.log("All Students Data", getUser);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

// router.get("/student", async (req, res) => {
//   function printStudents(pageNumber, nPerPage) {
//   print("Page: " + pageNumber);
// let getUser = await Studentds.find()
//     .sort({ _id: 1 })
//     .skip(pageNumber > 0 ? (pageNumber - 1) * nPerPage : 0)
//     .limit(nPerPage)
//     .forEach((getUser) => {
//       res.send("pagination",getuser);
//     });
// }
// }

// router.get("/student", async (req, res) => {
//   try {
//     const page = parseInt(req.query.page); // Make sure to parse the page to number
//     // We are using the '3 layer' architecture explored on the 'bulletproof node.js architecture'
//     // Basically, it's just a class where we have our business logic
//     const Studentds = new Studentds();
//     const users = await Studentds.getAll(page);
//     return res.status(200).json(users);
//   } catch (e) {
//     return res.status(500).json(e);
//   }
// });

// class UserPaginationExample {
//   getAll(page = 1) {
//     const PAGE_SIZE = 20; // Similar to 'limit'
//     const skip = (page - 1) * PAGE_SIZE; // For page 1, the skip is: (1 - 1) * 20 => 0 * 20 = 0
//     return Studentds.find({})
//       .skip(skip) // Same as before, always use 'skip' first
//       .limit(PAGE_SIZE);
//   }
// }

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
