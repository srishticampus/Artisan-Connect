const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./dbConnection");
const route = require("./routes");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/upload`));

// Routes
app.use("/atrisan_connect", route);

// Start Server
const PORT = 4004;
app.listen(PORT, () => {
  console.log(`Server is running successfully on port ${PORT}`);
});
