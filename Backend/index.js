// server.js
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const PORT = 3000;

// Middleware to parse JSON request body
app.use(bodyParser.json());

// API endpoint to create a new user and appointment
app.post('/api/appointments', (req, res) => {
  const { name, mobile, city, pincode, address, therapistId, bookingTime, slotTime } = req.body;

  // Start a transaction
  db.beginTransaction((err) => {
    if (err) {
      return res.status(500).json({ error: 'Transaction error' });
    }

    // Step 1: Insert a new user
    const userQuery = 'INSERT INTO users (name, mobile, city, pincode, address) VALUES (?, ?, ?, ?, ?)';
    db.query(userQuery, [name, mobile, city, pincode, address], (err, userResult) => {
      if (err) {
        return db.rollback(() => {
          res.status(500).json({ error: 'Error inserting user' });
        });
      }

      // Step 2: Insert a new appointment for the new user
      const appointmentQuery = 'INSERT INTO appointments (user_id, therapist_id, booking_completion_time, selected_slot) VALUES (?, ?, ?, ?)';
      const userId = userResult.insertId; // Get the last inserted user ID

      db.query(appointmentQuery, [userId, therapistId, bookingTime, slotTime], (err) => {
        if (err) {
          return db.rollback(() => {
            res.status(500).json({ error: 'Error inserting appointment' });
          });
        }

        // Commit the transaction
        db.commit((err) => {
          if (err) {
            return db.rollback(() => {
              res.status(500).json({ error: 'Transaction commit error' });
            });
          }
          res.status(201).json({ message: 'User and appointment created successfully' });
        });
      });
    });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
