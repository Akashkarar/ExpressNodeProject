let express = require("express");
let router = express.Router();

let Blog = require("../model/blog");

router.get("/getData", (request, response) => {
  if (request.query.search) {
    // searching
    console.log("Searching for: ", request.query.search);
    Blog.findOne({ title: request.query.search })
      .then((data) => {
        return response.status(200).json({ data });
      })
      .catch((error) => {
        return response.status(400).json({ data: error });
      });
  }
  // give all
  else {
    Blog.find()
      .then((data) => {
        return response.status(200).json({ data });
      })
      .catch((error) => {
        return response.status(400).json({ data: error });
      });
  }
});

function titleValidation(str) {
  String(str)
    .toLocaleLowerCase()
    .split("")
    .filter((char) => {
      if (/[a-z]/.test(char) || char === "-") {
        return true;
      } else {
        return false;
      }
    });
}

router.post("/addInfo", (request, response) => {
  console.info("INFO: Adding new info into BlOGS\n");

  // // validation
  // if (!titleValidation(request.body.title)) {
  //   response.status(400).json({ data: new Error("Validation failure!") });
  // }

  const blog = new Blog({
    title: request.body.title,
    content: request.body.content,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  blog
    .save()
    .then((data) => {
      console.log("Blog Saved!", data);
      return response.status(200).json({ data });
    })
    .catch((error) => {
      console.error("Error while Saving Blog:", error);
      return response.status(400).json({ data: error });
    });
});

router.post("/update/:id", (req, res) => {
  console.log("id", req.params.id);
  Blog.findByIdAndUpdate(
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
