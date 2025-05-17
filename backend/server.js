const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const messageRoutes = require('./routes/messages');
const cors = require('cors');
const path = require('path');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/messages', messageRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
console.log('MONGODB_URI:', process.env.MONGODB_URI);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});