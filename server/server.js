const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const dbPath = path.resolve(__dirname, './data/database.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err.message);
    } else {
        console.log('Conectado a la base de datos SQLite.');
    }
});

process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error('Error al cerrar la base de datos:', err.message);
        }
        console.log('Conexión a SQLite cerrada.');
        process.exit(0);
    });
});

// Enpoints
app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM Users';
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({
            message: 'Success',
            data: rows
        });
    });
});

app.get('/users/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'SELECT * FROM Users WHERE id = ?';
    const params = [id];

    db.get(sql, params, (err, row) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({
            message: 'Success',
            data: row
        });
    });
});

app.post('/users', (req, res) => {
    const { first_name, last_name, email, phone } = req.body;
    const sql = 'INSERT INTO Users (first_name, last_name, email, phone) VALUES (?, ?, ?, ?)';
    const params = [first_name, last_name, email, phone];

    db.run(sql, params, function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({
            message: 'User created successfully',
            data: {
                id: this.lastID,
                first_name,
                last_name,
                email,
                phone
            }
        });
    });
});

app.put('/users/:id', (req, res) => {
    const { first_name, last_name, email, phone } = req.body;
    const { id } = req.params;

    const sql = `
        UPDATE Users
        SET first_name = ?, last_name = ?, email = ?, phone = ?
        WHERE id = ?
    `;
    const params = [first_name, last_name, email, phone, id];

    db.run(sql, params, function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({
            message: 'User updated successfully',
            data: { id, first_name, last_name, email, phone }
        });
    });
});

app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM Users WHERE id = ?';

    db.run(sql, id, function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({
            message: 'User deleted successfully',
            data: { id }
        });
    });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
