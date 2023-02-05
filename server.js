const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;
const cors = require('cors');

const app = express();

// Init Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({
    origin: ['http://localhost:3000', 'https://pml.onrender.com']
}));

// Define Routes
app.use('/api/generate', require('./routes/api/generateLines'));
app.use('/api/save', require('./routes/api/saveToGoogleSheet'));

//// Serve static assets in production
//if (process.env.NODE_ENV === 'production') {
//  // Set static folder
//  app.use(express.static('client/build'));
//
//  app.get('*', (req, res) => {
//    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//  });
//}

app.listen(port, () => console.log(`Server started on port ${port}`));