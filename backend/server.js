
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();
const connectDb = require('./config/dbConnection');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));

// Rate limit for auth endpoints
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // limit each IP to 10 requests per windowMs
    message: 'Too many login attempts, please try again later.'
});
app.use('/api/auth/login', authLimiter);

// Ensure required env vars are present before attempting DB connection
if (!process.env.MONGO_URL) {
    console.error('Missing MONGO_URL environment variable. Create backend/.env and set MONGO_URL to your MongoDB connection string.');
    process.exit(1);
}
if (!process.env.JWT_SECRET) {
    console.error('Missing JWT_SECRET environment variable. Create backend/.env and set JWT_SECRET to a long random string.');
    process.exit(1);
}

connectDb();
app.get('/', (req, res) => {
    res.send('Express server is running!');
});

// Routes
const serviceRoutes = require('./routes/serviceroutes');
const adminRoutes = require('./routes/adminroutes');
const { redirectService } = require('./controller/servicecontroller');
app.use('/api/services', serviceRoutes);
app.use('/api/auth', adminRoutes);
// Public redirect at root-level per spec
app.get('/redirect/:id', redirectService);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});