const path = require('path');
const db = require('better-sqlite3')(path.join(__dirname, 'minecraft_data.db'));

// One-time setup: Create tables if they don't exist
const setupScript = `
  CREATE TABLE IF NOT EXISTS raw_materials (
    name TEXT PRIMARY KEY
  );
  CREATE TABLE IF NOT EXISTS recipes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    output_item TEXT NOT NULL,
    output_quantity INTEGER NOT NULL
  );
  CREATE TABLE IF NOT EXISTS ingredients (
    recipe_id INTEGER,
    item_name TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (recipe_id) REFERENCES recipes(id)
  );
`;

db.exec(setupScript);

console.log('Database initialized.');

module.exports = { db };