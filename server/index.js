// server.js: entry point for Node.js server, initializes express server, connects to database, deifnes middleware (?)
const express = require("express");
//1. connect to express app
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//importing routes
const { userRouter, verifyToken } = require("./routes/users.js");
const outfitsRouter = require("./routes/outfits.js");

//DATABASE, connect to mongodb

const uri =
  "mongodb+srv://jj3115:txokmrMy08fRzyrW@closetappcluster.ex5d7hn.mongodb.net/ClosetAppCluster?retryWrites=true&w=majority";

async function connect() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected to mongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

connect();

//middleware?
app.use(cors());
app.use(bodyParser.json());

//importing routes
app.use("/auth", userRouter);
app.use("/outfits", outfitsRouter);

app.get("/", cors(), (req, res) => {
  res.send(
    "hello world!!!!! an app to track different outfits version literally 0.01 of fitted"
  );
});

//START
app.listen(3001, () => {
  console.log("server started on port 3001");
});
