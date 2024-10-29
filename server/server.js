const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const multer = require('multer');
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 3000;
const saltRounds = 10;

// Configuración de Multer para carga de archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

app.use(cors());
app.use(express.json());

// Configuración de conexión a Supabase PostgreSQL
const pool = new Pool({
    host: 'aws-0-us-west-1.pooler.supabase.com',
    user: 'postgres.vfwkmxsgdsnpdtebeize',
    password: 'R4dI@-JKdaNCE',
    database: 'postgres',
    port: 6543,
    ssl: { rejectUnauthorized: false }
});

async function query(sql, params = []) {
    const client = await pool.connect();
    try {
        const result = await client.query(sql, params);
        return result.rows;
    } finally {
        client.release();
    }
}

// Verifica la conexión a la base de datos
pool.connect((err) => {
    if (err) {
        console.error('Error al conectar con la base de datos de Supabase:', err.message);
    } else {
        console.log('Conectado a la base de datos de Supabase PostgreSQL.');
    }
});

// Cerrar la conexión cuando se detiene el proceso
process.on('SIGINT', () => {
    pool.end(() => {
        console.log('Conexión a PostgreSQL cerrada.');
        process.exit(0);
    });
});

const generateTempPassword = () => {
    const length = 12;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let tempPassword = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        tempPassword += charset[randomIndex];
    }
    return tempPassword;
};

// Enpoints para usuarios
app.get('/users', async (req, res) => {
    try {
        const rows = await query('SELECT * FROM Users');
        res.json({ message: 'Success', data: rows });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const rows = await query('SELECT * FROM Users WHERE id = $1', [id]);
        if (rows.length === 0) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'Success', data: rows[0] });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.post('/users', async (req, res) => {
    const { first_name, last_name, email, phone } = req.body;
    
    // Generar una contraseña temporal
    const tempPassword = generateTempPassword(); 
    // Encriptar la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(tempPassword, saltRounds);
    
    try {
        const rows = await query(
            'INSERT INTO Users (first_name, last_name, email, phone, password) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [first_name, last_name, email, phone, hashedPassword]
        );
        res.json({ message: 'Usuario registrado exitosamente. La contraseña temporal es: ' + tempPassword, data: rows[0] });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.put('/users/:id', async (req, res) => {
    const { first_name, last_name, email, phone, password } = req.body;
    const { id } = req.params;

    try {
        // Si se proporciona una nueva contraseña, encríptala
        let hashedPassword;
        if (password) {
            hashedPassword = await bcrypt.hash(password, saltRounds);
        }

        const rows = await query(
            `UPDATE Users SET first_name = $1, last_name = $2, email = $3, phone = $4, password = $5 WHERE id = $6 RETURNING *`,
            [first_name, last_name, email, phone, hashedPassword || null, id] // Si no hay nueva contraseña, se establece como null
        );

        if (rows.length === 0) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User updated successfully', data: rows[0] });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const rows = await query('DELETE FROM Users WHERE id = $1 RETURNING id', [id]);
        if (rows.length === 0) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User deleted successfully', data: rows[0] });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Endpoints para Eventos
app.post('/events', async (req, res) => {
    const { name, event_date, location, description, category_id, workgroup_id } = req.body;
    try {
        const rows = await query(
            'INSERT INTO Events (name, event_date, location, description, category_id, workgroup_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [name, event_date, location, description, category_id, workgroup_id]
        );
        res.json({ message: 'Event created successfully', data: rows[0] });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/events', async (req, res) => {
    try {
        const rows = await query('SELECT * FROM Events');
        res.json({ message: 'Success', data: rows });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/events/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const rows = await query('SELECT * FROM Events WHERE id = $1', [id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Event not found' });
        res.json({ message: 'Success', data: rows[0] });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.put('/events/:id', async (req, res) => {
    const { name, event_date, location, description, category_id, workgroup_id } = req.body;
    const { id } = req.params;
    try {
        const rows = await query(
            `UPDATE Events SET name = $1, event_date = $2, location = $3, description = $4, category_id = $5, workgroup_id = $6 WHERE id = $7 RETURNING *`,
            [name, event_date, location, description, category_id, workgroup_id, id]
        );
        if (rows.length === 0) return res.status(404).json({ message: 'Event not found' });
        res.json({ message: 'Event updated successfully', data: rows[0] });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.delete('/events/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const rows = await query('DELETE FROM Events WHERE id = $1 RETURNING id', [id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Event not found' });
        res.json({ message: 'Event deleted successfully', data: rows[0] });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Endpoints para TicketCategories
app.post('/ticket-categories', async (req, res) => {
    const { name, price, description, workgroup_id } = req.body;
    try {
        const rows = await query(
            'INSERT INTO TicketCategories (name, price, description, workgroup_id) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, price, description, workgroup_id]
        );
        res.json({ message: 'Ticket category created successfully', data: rows[0] });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/ticket-categories', async (req, res) => {
    try {
        const rows = await query('SELECT * FROM TicketCategories');
        res.json({ message: 'Success', data: rows });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/ticket-categories/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const rows = await query('SELECT * FROM TicketCategories WHERE id = $1', [id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Ticket category not found' });
        res.json({ message: 'Success', data: rows[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/ticket-categories/:id', async (req, res) => {
    const { id } = req.params;
    const { name, price, description, workgroup_id } = req.body;
    try {
        const rows = await query(
            `UPDATE TicketCategories SET name = $1, price = $2, description = $3, workgroup_id = $4 WHERE id = $5 RETURNING *`,
            [name, price, description, workgroup_id, id]
        );
        if (rows.length === 0) return res.status(404).json({ message: 'Ticket category not found' });
        res.json({ message: 'Ticket category updated successfully', data: rows[0] });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.delete('/ticket-categories/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const rows = await query('DELETE FROM TicketCategories WHERE id = $1 RETURNING id', [id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Ticket category not found' });
        res.json({ message: 'Ticket category deleted successfully', data: rows[0] });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// Endpoints para boletos
app.get('/tickets', async (req, res) => {
    try {
        const rows = await query('SELECT * FROM Tickets');
        res.json({ message: 'Success', data: rows });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/tickets/:code', async (req, res) => {
    const { code } = req.params;
    try {
        const rows = await query('SELECT * FROM Tickets WHERE code = $1', [code]);
        if (rows.length === 0) return res.status(404).json({ message: 'Ticket not found' });
        res.json({ message: 'Success', data: rows[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/tickets', async (req, res) => {
    const { code, name, category_id, status, workgroup_id } = req.body;
    try {
        const rows = await query(
            'INSERT INTO Tickets (code, name, category_id, status, workgroup_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [code, name, category_id, status, workgroup_id]
        );
        res.json({ message: 'Ticket created successfully', data: rows[0] });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.put('/tickets/:code', async (req, res) => {
    const { code } = req.params;
    const { name, category_id, status, workgroup_id } = req.body;
    try {
        const rows = await query(
            `UPDATE Tickets SET name = $1, category_id = $2, status = $3, workgroup_id = $4 WHERE code = $5 RETURNING *`,
            [name, category_id, status, workgroup_id, code]
        );
        if (rows.length === 0) return res.status(404).json({ message: 'Ticket not found' });
        res.json({ message: 'Ticket updated successfully', data: rows[0] });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.delete('/tickets/:code', async (req, res) => {
    const { code } = req.params;
    try {
        const rows = await query('DELETE FROM Tickets WHERE code = $1 RETURNING code', [code]);
        if (rows.length === 0) return res.status(404).json({ message: 'Ticket not found' });
        res.json({ message: 'Ticket deleted successfully', data: rows[0] });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// Endpoint para tener los boletos con su información completa
app.get('/ticket-view', async (req, res) => {
    try {
        const rows = await query('SELECT * FROM TicketFullInfo');
        res.json({ message: 'Success', data: rows });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/ticket-view/:code', async (req, res) => {
    const { code } = req.params;
    try {
        const rows = await query('SELECT * FROM TicketFullInfo WHERE code = $1', [code]);
        if (rows.length === 0) return res.status(404).json({ message: 'Ticket not found' });
        res.json({ message: 'Success', data: rows[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoints para registros (Attendance en lugar de Registration)
app.get('/attendance', async (req, res) => {
    try {
        const rows = await query('SELECT * FROM Attendance');
        res.json({ message: 'Success', data: rows });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/attendance/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const rows = await query('SELECT * FROM Attendance WHERE id = $1', [id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Attendance not found' });
        res.json({ message: 'Success', data: rows[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/attendance', async (req, res) => {
    const { user_id, event_id, ticket_code, workgroup_id } = req.body;
    try {
        // Verificar el estado del boleto
        const ticketRows = await query('SELECT status FROM Tickets WHERE code = $1', [ticket_code]);
        if (ticketRows.length === 0 || ticketRows[0].status !== 'Sin Usar') {
            return res.status(400).json({ error: 'Este boleto es inválido o ya ha sido usado.' });
        }

        // Crear el registro de asistencia
        const rows = await query(
            'INSERT INTO Attendance (user_id, event_id, ticket_code, workgroup_id) VALUES ($1, $2, $3, $4) RETURNING *',
            [user_id, event_id, ticket_code, workgroup_id]
        );
        res.json({ message: 'Attendance created successfully', data: rows[0] });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.put('/attendance/:id', async (req, res) => {
    const { user_id, event_id, ticket_code, workgroup_id } = req.body;
    const { id } = req.params;
    try {
        const rows = await query(
            `UPDATE Attendance SET user_id = $1, event_id = $2, ticket_code = $3, workgroup_id = $4 WHERE id = $5 RETURNING *`,
            [user_id, event_id, ticket_code, workgroup_id, id]
        );
        if (rows.length === 0) return res.status(404).json({ message: 'Attendance not found' });
        res.json({ message: 'Attendance updated successfully', data: rows[0] });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.delete('/attendance/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const rows = await query('DELETE FROM Attendance WHERE id = $1 RETURNING id', [id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Attendance not found' });
        res.json({ message: 'Attendance deleted successfully', data: rows[0] });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Endpoint para obtener los registros con información completa (AttendanceDetails en lugar de RegistrationDetails)
app.get('/attendance-info', async (req, res) => {
    try {
        const rows = await query('SELECT * FROM AttendanceDetails');
        res.json({ message: 'Success', data: rows });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/attendance-info/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const rows = await query('SELECT * FROM AttendanceDetails WHERE attendance_id = $1', [id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Attendance not found' });
        res.json({ message: 'Success', data: rows[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// enpoint para obtener las categorías de boletos con sus respectivos conteos
app.get('/ticket-categories-with-counts', async (req, res) => {
    try {
        const rows = await query('SELECT * FROM TicketCategoriesWithCounts');
        res.json({ message: 'Success', data: rows });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/ticket-categories-with-counts/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const rows = await query('SELECT * FROM TicketCategoriesWithCounts WHERE id = $1', [id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Ticket category not found' });
        res.json({ message: 'Success', data: rows[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener todos los boletos de una categoría específica
app.get('/tickets/category/:category_id', async (req, res) => {
    const { category_id } = req.params;
    try {
        const rows = await query('SELECT * FROM Tickets WHERE category_id = $1', [category_id]);
        res.json({ message: 'Success', data: rows });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
