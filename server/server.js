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

// Endpoints para categorías de boletos
app.post('/ticket-categories', (req, res) => {
    const { name, price, description } = req.body;
    const sql = 'INSERT INTO TicketCategories (name, price, description) VALUES (?, ?, ?)';
    const params = [name, price, description];

    db.run(sql, params, function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({
            message: 'Ticket category created successfully',
            data: {
                id: this.lastID,
                name,
                price,
                description
            }
        });
    });
});

app.get('/ticket-categories', (req, res) => {
    const sql = 'SELECT * FROM TicketCategories';
    
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

app.get('/ticket-categories/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'SELECT * FROM TicketCategories WHERE id = ?';
    const params = [id];

    db.get(sql, params, (err, row) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ message: 'Ticket category not found' });
        }
        res.json({
            message: 'Success',
            data: row
        });
    });
});

app.put('/ticket-categories/:id', (req, res) => {
    const { name, price, description } = req.body;
    const { id } = req.params;

    const sql = `
        UPDATE TicketCategories
        SET name = ?, price = ?, description = ?
        WHERE id = ?
    `;
    const params = [name, price, description, id];

    db.run(sql, params, function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Ticket category not found' });
        }
        res.json({
            message: 'Ticket category updated successfully',
            data: { id, name, price, description }
        });
    });
});

app.delete('/ticket-categories/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM TicketCategories WHERE id = ?';

    db.run(sql, id, function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Ticket category not found' });
        }
        res.json({
            message: 'Ticket category deleted successfully',
            data: { id }
        });
    });
});

// Endpoints para boletos
app.post('/tickets', (req, res) => {
    const { code, name, category_id, status } = req.body;
    const sql = 'INSERT INTO Tickets (code, name, category_id, status) VALUES (?, ?, ?, ?)';
    const params = [code, name, category_id, status];

    db.run(sql, params, function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({
            message: 'Ticket created successfully',
            data: {
                code,
                name,
                category_id,
                status
            }
        });
    });
});

app.get('/tickets', (req, res) => {
    const sql = 'SELECT * FROM Tickets';
    
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

app.get('/tickets/:code', (req, res) => {
    const { code } = req.params;

    const sql = 'SELECT * FROM Tickets WHERE code = ?';
    const params = [code];

    db.get(sql, params, (err, row) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        res.json({
            message: 'Success',
            data: row
        });
    });
});

app.put('/tickets/:code', (req, res) => {
    const { name, category_id, status } = req.body;
    const { code } = req.params;

    const sql = `
        UPDATE Tickets
        SET name = ?, category_id = ?, status = ?
        WHERE code = ?
    `;
    const params = [name, category_id, status, code];

    db.run(sql, params, function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        res.json({
            message: 'Ticket updated successfully',
            data: { code, name, category_id, status }
        });
    });
});

app.delete('/tickets/:code', (req, res) => {
    const { code } = req.params;

    const sql = 'DELETE FROM Tickets WHERE code = ?';

    db.run(sql, code, function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        res.json({
            message: 'Ticket deleted successfully',
            data: { code }
        });
    });
});

// Endpoint para tener Boleto y sus categorias
app.get('/ticket-with-counts', async (req, res) => {
    const sql = 'SELECT * FROM TicketCategoriesWithCounts';
    
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
app.get('/tickets/category/:category_id', async (req, res) => {
    const { category_id } = req.params; // Obtiene el category_id de la URL
    const sql = 'SELECT * FROM Tickets WHERE category_id = ?'; // Filtra por category_id

    db.all(sql, [category_id], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({
            message: 'Success',
            data: rows
        });
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
