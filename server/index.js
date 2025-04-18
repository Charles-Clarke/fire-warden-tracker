const express = require("express");
const cors = require("cors");
const { connectToDatabase, sql } = require("./db");

connectToDatabase(); // Connect to Azure SQL

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Health check route
app.get("/", (req, res) => {
  res.send("Fire Warden Tracker API is running!");
});

// Get all wardens
app.get("/api/wardens", async (req, res) => {
  try {
    const request = new sql.Request();
    const result = await request.query("SELECT * FROM fire_wardens ORDER BY timestamp DESC");
    res.json(result.recordset);
  } catch (err) {
    console.error("Fetch failed:", err);
    res.status(500).json({ error: "Failed to fetch wardens" });
  }
});

// Add a new warden
app.post("/api/wardens", async (req, res) => {
  const { staff_number, first_name, last_name, location } = req.body;

  try {
    const request = new sql.Request();
    await request
      .input("staff_number", sql.VarChar(20), staff_number)
      .input("first_name", sql.VarChar(50), first_name)
      .input("last_name", sql.VarChar(50), last_name)
      .input("location", sql.VarChar(100), location)
      .query(`
        INSERT INTO fire_wardens (staff_number, first_name, last_name, location)
        VALUES (@staff_number, @first_name, @last_name, @location)
      `);

    res.status(201).json({ message: "Fire warden added successfully!" });
  } catch (err) {
    console.error("Insert failed:", err);
    res.status(500).json({ error: "Failed to insert fire warden" });
  }
});

// Delete a warden
app.delete("/api/wardens/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const request = new sql.Request();
    await request.input("id", sql.Int, id).query("DELETE FROM fire_wardens WHERE id = @id");
    res.json({ message: "Warden deleted successfully!" });
  } catch (err) {
    console.error("Delete failed:", err);
    res.status(500).json({ error: "Failed to delete warden" });
  }
});

// Update a warden
app.put("/api/wardens/:id", async (req, res) => {
  const { id } = req.params;
  const { staff_number, first_name, last_name, location } = req.body;

  console.log("Updating ID:", id);
  console.log("Data:", req.body);

  try {
    const request = new sql.Request();
    await request
      .input("id", sql.Int, id)
      .input("staff_number", sql.VarChar(20), staff_number)
      .input("first_name", sql.VarChar(50), first_name)
      .input("last_name", sql.VarChar(50), last_name)
      .input("location", sql.VarChar(100), location)
      .query(`
        UPDATE fire_wardens
        SET staff_number = @staff_number,
            first_name = @first_name,
            last_name = @last_name,
            location = @location
        WHERE id = @id
      `);

    res.json({ message: "Warden updated successfully!" });
  } catch (err) {
    console.error("Update failed:", err);
    res.status(500).json({ error: "Failed to update warden" });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
