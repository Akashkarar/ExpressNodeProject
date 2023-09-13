var express = require("express");
var blogTable = require("../src/model/blog");

var router = express.Router();
router.post("/addData", (req, res) => {
  console.log("API Working", req.body);
  var blog = new blogTable({
    name: req.body.name,
    gender: req.body.gender,
  });
  blog
    .save()
    .then((data) => {
      console.log("Save data", data);
      return res.status(200).json({ saveData: data });
    })
    .catch((error) => {
      console.log("Error data", error);
      return res.status(400).json({ saveData: error });
    });
});

router.get("/getData", (req, res) => {
  blogTable
    .find()
    .then((data) => {
      return res.status(200).json({ getData: data });
    })
    .catch((error) => {
      console.log("Error data", error);
      return res.status(400).json({ getData: error });
    });
});

router.find("/getData", (req, res) => {
  blogTable
    .find()
    .then((data) => {
      return res.status(200).json({ getData: data });
    })
    .catch((error) => {
      console.log("Error data", error);
      return res.status(400).json({ getData: error });
    });
});

router.post("/putData/:id", (req, res) => {
  console.log("paramsData", req.params.id);
  blogTable
    .findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    )
    .then((data) => {
      return res.status(200).json({ putData: "data Updated succesfully" });
    })
    .catch((error) => {
      console.log("Error data", error);
      return res.status(400).json({ putData: error });
    });
});
module.exports = router;
