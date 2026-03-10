# Inventory Backend (Node + Express + MySQL)

## What you received
A simple backend that provides REST APIs for your static frontend (HTML + JS).
Features:
- Add, edit, delete assets
- Get all assets / get single asset
- Transfer (track) asset movements (history stored in JSON)

## Setup

1. Ensure you have Node.js and MySQL installed.
2. Unzip this project and open a terminal in the backend folder.
3. Install dependencies:
   ```
   npm install
   ```
4. Edit database credentials if needed:
   - By default the backend uses:
     - DB_NAME=inventory_db
     - DB_USER=root
     - DB_PASS=(empty)
     - DB_HOST=localhost
   You can provide these using environment variables (DB_NAME, DB_USER, DB_PASS, DB_HOST) or edit `config/db.js`.

5. Create the database (if not existing) in MySQL:
   ```
   CREATE DATABASE IF NOT EXISTS inventory_db;
   ```

6. Start the server:
   ```
   node server.js
   ```
   Or during development:
   ```
   npm run dev
   ```

7. Server will listen on `http://localhost:5000` by default.
   Example API: `GET http://localhost:5000/api/assets`

## How to call from your frontend
Example to get all assets:
```js
fetch('http://localhost:5000/api/assets').then(r => r.json()).then(console.log);
```

To add an asset:
```js
fetch('http://localhost:5000/api/assets', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({ name: 'Laptop', description: 'Dell', serialNumber: 'SN123', location: 'Office' })
}).then(r=>r.json()).then(console.log);
```

To transfer asset:
```js
fetch('http://localhost:5000/api/assets/1/transfer', {
  method: 'PUT',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({ from: 'Office A', to: 'Office B', note: 'Moved for repair' })
}).then(r=>r.json()).then(console.log);
```

