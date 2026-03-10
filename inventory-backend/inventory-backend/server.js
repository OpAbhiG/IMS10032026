const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const assetRoutes = require('./routes/assetRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/assets', assetRoutes);

// Health check
app.get('/', (req, res) => res.send({ status: 'ok', message: 'Inventory backend running' }));

// Start server
async function start() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection OK');

    // Sync models
    await sequelize.sync();
    console.log('✅ Models synced');

    app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
  } catch (err) {
    console.error('❌ Failed to start server:', err);
  }
}

start();


// const express = require('express');
// const cors = require('cors');
// const { sequelize } = require('./config/db');
// const assetRoutes = require('./routes/assetRoutes');

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// app.use('/api/assets', assetRoutes);

// // health
// app.get('/', (req, res) => res.send({ status: 'ok', message: 'Inventory backend running' }));


// // CREATE NEW ASSET
// app.post("/api/assets", (req, res) => {
//   const {
//     name,
//     model,
//     serialNumber,
//     user,
//     price,
//     buyDate,
//     extraDetails,
//     addedDate
//   } = req.body;

//   // Validation check
//   if (!name || !model || !serialNumber || !user) {
//     return res.status(400).json({ error: "Missing required fields" });
//   }

//   const query = `
//     INSERT INTO assets_item
//     (itemName, itemModel, serialNumber, assignedUser, purchasePrice, purchaseDate, additionalNotes, addedDate)
//     VALUES (?, ?, ?, ?, ?, ?, ?, ?)
//   `;

//   db.query(
//     query,
//     [name, model, serialNumber, user, price || null, buyDate || null, extraDetails || null, addedDate],
//     (err, result) => {
//       if (err) {
//         console.error("❌ Error inserting asset:", err);
//         return res.status(500).json({ error: "Database error", details: err });
//       }
//       console.log("✅ Asset saved:", result.insertId);
//       res.status(201).json({ message: "Item saved successfully", assetId: result.insertId });
//     }
//   );
// });


// // sync DB and start
// async function start() {
//   try {
//     await sequelize.authenticate();
//     console.log('Database connection OK');
//     // Sync models (use { alter: true } if you want automatic migrations)
//     await sequelize.sync({ alter: true });
//     console.log('Models synced');
//     app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
//   } catch (err) {
//     console.error('Failed to start server:', err);
//   }
// }
// start();
