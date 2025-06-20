require('dotenv').config();
const express = require('express');
const db_async = require('./models/db_async');
const os = require('os');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const adminAuthRouter = require('./routes/adminAuth');
const requireAuth = require('./middleware/requireAuth');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

const allowedOrigins = ['http://localhost:3000', 'http://127.0.0.1:5500', 'http://192.168.50.210:3000', 'http://192.168.50.210:5500', 'http://127.0.0.1:5501', 'http://192.168.65.210:3000', 'http://192.168.65.210:5000', 'http://192.168.65.210:5500', 'http://127.0.0.1:5503'];

app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
}));

// Handle preflight requests
app.options('*', cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
}));

// Middleware to verify JWT token
app.use((req, res, next) => {
  if (req.path.startsWith('/api/users/profile') || req.path.startsWith('/api/users')) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret', (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      req.userId = decoded.id;
      next();
    });
  } else {
    next();
  }
});

app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/admin/auth', adminAuthRouter);
const adminRouter = require('./routes/admin');
app.use('/api/admin', adminRouter);

// Serve frontend static files
const path = require('path');
app.use('/frontend', express.static(path.join(__dirname, '../frontend')));

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Backend server with Sequelize is running');
});

// Test database connection and sync models
async function initializeDatabase() {
  try {
    await db_async.sequelize.authenticate();
    console.log('Connection to MySQL has been established successfully.');

    // To enable database sync, uncomment the following lines:
    // await db_async.sequelize.sync({ force: true }); // Drops and recreates tables
    // console.log('Database & tables dropped and recreated!');

    app.listen(port, () => {
      const interfaces = os.networkInterfaces();
      let ipAddress = 'localhost';
      for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
          if (iface.family === 'IPv4' && !iface.internal) {
            ipAddress = iface.address;
            break;
          }
        }
      }
      console.log(`Server is running on port http://${ipAddress}:${port}/`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
}

// Start the server after DB initialization
initializeDatabase();

module.exports = { sequelize: db_async.sequelize };
