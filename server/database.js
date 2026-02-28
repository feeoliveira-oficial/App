const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.resolve(__dirname, "acme.db");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error opening database", err.message);
  } else {
    console.log("Connected to SQLite database.");
  }
});

db.serialize(() => {

  /* ==========================
     CLIENTS
  ========================== */
  db.run(`
    CREATE TABLE IF NOT EXISTS clients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      address TEXT,
      phone TEXT,
      email TEXT,
      status TEXT DEFAULT 'active'
    )
  `);

  /* ==========================
     SERVICES (OBRAS)
  ========================== */
  db.run(`
    CREATE TABLE IF NOT EXISTS services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      clientId INTEGER,
      description TEXT,
      totalCharged REAL DEFAULT 0,
      totalReceived REAL DEFAULT 0,
      startDate TEXT,
      endDate TEXT,
      status TEXT DEFAULT 'in_progress',
      FOREIGN KEY (clientId) REFERENCES clients(id)
    )
  `);

  db.run(`
  ALTER TABLE services ADD COLUMN status TEXT DEFAULT 'in_progress'
`, (err) => {
  if (err && !err.message.includes("duplicate column")) {
    console.error(err.message);
  }
});

  /* ==========================
     MATERIALS (ESTOQUE GLOBAL)
  ========================== */
  db.run(`
    CREATE TABLE IF NOT EXISTS materials (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      stock INTEGER DEFAULT 0,
      unitCost REAL DEFAULT 0
    )
  `);

  /* ==========================
     SERVICE_MATERIALS
  ========================== */
  db.run(`
    CREATE TABLE IF NOT EXISTS service_materials (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      serviceId INTEGER,
      materialId INTEGER,
      quantityUsed INTEGER,
      FOREIGN KEY (serviceId) REFERENCES services(id),
      FOREIGN KEY (materialId) REFERENCES materials(id)
    )
  `);

});

module.exports = db;