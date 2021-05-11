const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));
const PORT = process.env.PORT || 5000;

//Define Routes
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/course', require('./routes/api/course'));
app.use('/api/event', require('./routes/api/event'));
app.use('/api/assignment', require('./routes/api/assignment'));
app.use('/api/payment', require('./routes/api/payment'));

// Serve static assets for production
if (process.env.NODE_ENV == 'production') {
  //set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => console.log(`Server Running on port ${PORT}!`));
