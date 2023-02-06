const express = require("express");
const app = express();
const mongoose = require("mongoose");
const NoteRoutes = require("./routes/noteRoutes");
const dotenv = require("dotenv");
const UserRoutes = require("./routes/userRoutes");
const { connectDB } = require("./db");
const cors = require("cors");
app.use(cors());
dotenv.config();
app.use(express.json());
// mongoose.connect(
//   "mongodb+srv://shaurya:shaurya@cluster0.k21ri6p.mongodb.net/?retryWrites=true&w=majority"
// );
connectDB();
app.get("/", function (req, res) {
  res.send("<h1>hello world</h1>");
});
app.use("/user", UserRoutes);
app.use("/note", NoteRoutes);
app.listen(process.env.PORT, function () {
  console.log(`server started on http://localhost:${process.env.PORT}`);
});
