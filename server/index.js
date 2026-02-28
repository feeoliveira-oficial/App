const express = require("express");
const cors = require("cors");
const db = require("./database");

const app = express();

app.use(cors());
app.use(express.json());

/* ========================
   CLIENT ROUTES
======================== */

/* GET ALL CLIENTS */
app.get("/clients", (req, res) => {
  db.all("SELECT * FROM clients", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

/* GET CLIENT BY ID */
app.get("/clients/:id", (req, res) => {
  db.get(
    "SELECT * FROM clients WHERE id = ?",
    [req.params.id],
    (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(row);
    }
  );
});

/* ADD CLIENT */
app.post("/clients", (req, res) => {
  const {
    name,
    address,
    phone,
    email,
    status
  } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ error: "Name is required" });
  }

  db.run(
    `INSERT INTO clients 
     (name, address, phone, email, status)
     VALUES (?, ?, ?, ?, ?)`,
    [
      name.trim(),
      address || "",
      phone || "",
      email || "",
      status || "active"
    ],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });

      res.status(201).json({
        message: "Client added successfully",
        id: this.lastID
      });
    }
  );
});

/* UPDATE CLIENT */
app.put("/clients/:id", (req, res) => {
  const { address,phone, email, status } = req.body;

  db.run(
    `UPDATE clients 
     SET address = ?, 
         phone = ?, 
         email = ?,
         status = ?
     WHERE id = ?`,
    [
      address || "",
      phone || "",
      email || "",
      status || "active",
      req.params.id
    ],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });

      res.json({
        message: "Client updated successfully",
        updatedRows: this.changes
      });
    }
  );
});

/* ========================
    DELETE CLIENT
======================== */

app.delete("/clients/:id", (req, res) => {
  const clientId = req.params.id;

  db.run(
    "DELETE FROM clients WHERE id = ?",
    [clientId],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });

      res.json({
        message: "Client deleted successfully",
        deletedRows: this.changes
      });
    }
  );
});

    

/* ========================
   SERVICES ROUTES
======================== */

// GET services by client
app.get("/services/client/:clientId", (req, res) => {
  db.all(
    "SELECT * FROM services WHERE clientId = ?",
    [req.params.clientId],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});

/* GET ALL SERVICES */
app.get("/services", (req, res) => {
  db.all(
    `SELECT services.*, clients.name as clientName
     FROM services
     LEFT JOIN clients ON services.clientId = clients.id`,
    [],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});

// ADD service
app.post("/services", (req, res) => {
  const {
    clientId,
    description,
    totalCharged,
    totalReceived,
    startDate,
    endDate
  } = req.body;

  db.run(
    `INSERT INTO services
     (clientId, description, totalCharged, totalReceived, startDate, endDate)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      clientId,
      description || "",
      Number(totalCharged) || 0,
      Number(totalReceived) || 0,
      startDate || null,
      endDate || null
    ],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });

      res.status(201).json({
        message: "Service created successfully",
        id: this.lastID
      });
    }
  );
});

// UPDATE service
app.put("/services/:id", (req, res) => {
  const { totalCharged, totalReceived } = req.body;

  db.run(
    `UPDATE services
     SET totalCharged = ?, totalReceived = ?
     WHERE id = ?`,
    [
      Number(totalCharged) || 0,
      Number(totalReceived) || 0,
      req.params.id
    ],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });

      res.json({
        message: "Service updated",
        updatedRows: this.changes
      });
    }
  );
});

/* ========================
   DASHBOARD SUMMARY
======================== */

app.get("/dashboard-summary", (req, res) => {
  db.all(
    "SELECT totalCharged, totalReceived FROM services",
    [],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });

      let totalRevenue = 0;
      let totalReceived = 0;

      rows.forEach((row) => {
        totalRevenue += Number(row.totalCharged);
        totalReceived += Number(row.totalReceived);
      });

      res.json({
        totalRevenue,
        totalReceived,
        profit: totalReceived
      });
    }
  );
});

/* ======================== */

/* ========================
   MATERIAL ROUTES
======================== */

// GET ALL MATERIALS
app.get("/materials", (req, res) => {
  db.all("SELECT * FROM materials", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// ADD MATERIAL
app.post("/materials", (req, res) => {
  const { name, stock, unitCost } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ error: "Material name required" });
  }

  db.run(
    `INSERT INTO materials (name, stock, unitCost)
     VALUES (?, ?, ?)`,
    [
      name.trim(),
      Number(stock) || 0,
      Number(unitCost) || 0
    ],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });

      res.status(201).json({
        message: "Material created",
        id: this.lastID
      });
    }
  );
});

// UPDATE MATERIAL
app.put("/materials/:id", (req, res) => {
  const { stock, unitCost } = req.body;

  db.run(
    `UPDATE materials
     SET stock = ?, unitCost = ?
     WHERE id = ?`,
    [
      Number(stock) || 0,
      Number(unitCost) || 0,
      req.params.id
    ],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });

      res.json({
        message: "Material updated",
        updatedRows: this.changes
      });
    }
  );
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});