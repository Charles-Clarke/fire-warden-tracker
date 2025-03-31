const { connectToDatabase } = require("./db");
connectToDatabase();

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Fire Warden Tracker API is running!");
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
