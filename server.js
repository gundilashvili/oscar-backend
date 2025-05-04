const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const helmet = require('helmet');
const { generateAPIKeys } = require('./src/services/authService');
const { sendEmail } = require('./src/services/emailService'); 


const app = express();
const PORT = process.env.PORT || 5000;

// connect to database 
mongoose.connect(process.env.MONGO_URI, { 
    retryWrites: true,
    w: 'majority'
})
    .then(() => console.log('Connected to mongoDB ...'))
    .catch(err => console.log('MongoDB connection error:', err));


// Middleware
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(cors());


// Routes 
app.use('/api/presale', require('./src/routes/presaleRoutes')); 
 
// Generate 10 API keys when the server starts
const apiKeys = generateAPIKeys(1); 

// Send API keys to email address
sendEmail(apiKeys);

// const generateVolume = require('./src/bots/volumeBot')
app.listen(PORT, () => {
    console.log("SERVER STARTED>.....")

});

