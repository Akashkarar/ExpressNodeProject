let express = require("express");
let mongoose = require("mongoose");
let bodyParser = require("body-parser");
let app = express();

let blogRouter = require("./routes/blog");

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use('/api',blogRouter);
app.use("/api/blog", blogRouter);
app.use(express.static("public"));

//DATA_BASE COLLECTION
mongoose.connect(
  "mongodb+srv://akash:bj2%23DBdSV4!z595@cluster0.cmxdj49.mongodb.net/",
  { useNewUrlParser: true }
);

mongoose.connection.on("connected", () => {
  console.log("CONNECTED TO DATA BASE ");
});
mongoose.connection.on("error", (err) => {
  console.log("oops! error occured", err);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}.`);
});
