// server.js
const express = require('express');
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');
const db = require('./db');

const app = express();
const PORT = 8080;

// Middleware to parse JSON request body
app.use(bodyParser.json());

// API endpoint to create a new user and appointment with validation
app.post('/api/appointments',
  [
    body('name').isString().withMessage('Name must be a string').notEmpty().withMessage('Name is required'),
    body('mobile').isMobilePhone('any').withMessage('Mobile number must be valid').notEmpty().withMessage('Mobile number is required'),
    body('city').isString().withMessage('City must be a string').notEmpty().withMessage('City is required'),
    body('pincode').isNumeric().withMessage('Pincode must be a number').notEmpty().withMessage('Pincode is required'),
    body('address').isString().withMessage('Address must be a string').notEmpty().withMessage('Address is required'),
    body('therapistId').isNumeric().withMessage('Therapist ID must be a number').notEmpty().withMessage('Therapist ID is required'),
    body('bookingTime').isISO8601().withMessage('Booking time must be a valid date').notEmpty().withMessage('Booking time is required'),
    body('slotTime').isISO8601().withMessage('Slot time must be a valid date').notEmpty().withMessage('Slot time is required')
  ],
  (req, res) => {
    // Validate incoming request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

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

// API endpoint to fetch therapists
app.get('/api/therapists', (req, res) => {
  const connection = db; // Use the existing connection
  const query = 'SELECT * FROM therapists';

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching therapists:', error);
      return res.status(500).json({ error: 'Error fetching therapists' });
    }
    res.status(200).json(results);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
