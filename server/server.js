const express = require('express');
const cors = require('cors'); 
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3000;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // La carpeta donde se guardarán los archivos subidos
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Renombrar el archivo
    }
});

const upload = multer({ storage });

app.use(cors());
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
        process.exit(0);s
    });
});

// Enpoints para usuarios
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

// Endpoints para eventos
app.post('/events', (req, res) => {
    const { name, event_date, location, description } = req.body;
    const sql = 'INSERT INTO Events (name, event_date, location, description) VALUES (?, ?, ?, ?)';
    const params = [name, event_date, location, description];

    db.run(sql, params, function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({
            message: 'Event created successfully',
            data: {
                id: this.lastID,
                name,
                event_date,
                location,
                description
            }
        });
    });
});

app.get('/events', (req, res) => {
    const sql = 'SELECT * FROM Events';
    
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

app.get('/events/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'SELECT * FROM Events WHERE id = ?';
    const params = [id];

    db.get(sql, params, (err, row) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json({
            message: 'Success',
            data: row
        });
    });
});

app.put('/events/:id', (req, res) => {
    const { name, event_date, location, description } = req.body;
    const { id } = req.params;

    const sql = `
        UPDATE Events
        SET name = ?, event_date = ?, location = ?, description = ?
        WHERE id = ?
    `;
    const params = [name, event_date, location, description, id];

    db.run(sql, params, function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json({
            message: 'Event updated successfully',
            data: { id, name, event_date, location, description }
        });
    });
});

app.delete('/events/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM Events WHERE id = ?';

    db.run(sql, id, function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json({
            message: 'Event deleted successfully',
            data: { id }
        });
    });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
