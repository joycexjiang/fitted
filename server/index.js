// server.js: entry point for Node.js server, initializes express server, connects to database, deifnes middleware (?)

const express = require("express");
//1. connect to express app
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
// const User = require("./models/userSchema");
// const jwt = require("jsonwebtoken");

// const SECRET_KEY = "joycesecret";
///second youtube tutorial
const bodyParser = require("body-parser");
// const bcrypt = require("bcrypt"); //hash password

//importing routes
const userRouter = require("./routes/users.js");
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
// //from youtube tutorial
app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
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

// //USER ROUTES

// app.post("/register", async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({ name, email, password: hashedPassword });
//     await newUser.save();
//     res.status(201).json({ message: "user created successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "error signing up" });
//   }
// });

// //get registered users
// app.get("/register", async (req, res) => {
//   try {
//     const users = await User.find();
//     res.status(201).json(users);
//   } catch (error) {
//     res.status(500).json({ error: "unable to get users" });
//   }
// });

// //get login
// app.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ error: "invalid email" });
//     }
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ error: "invalid password" });
//     }
//     const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
//       expiresIn: "1hr",
//     });
//     res.json({ message: "Login successful" });
//   } catch (error) {
//     res.status(500).json({ error: "error signing in" });
//   }
// });
