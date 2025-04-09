const express = require("express");
const app = express();
const mongoose = require("mongoose");

const cors = require("cors");

require("dotenv").config();

const route = require("./route");


const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json()); // This must come before routes!
app.use(express.urlencoded({ extended: true }));

app.use("/", route);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch(err => console.error("MongoDB Connection Error:", err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
