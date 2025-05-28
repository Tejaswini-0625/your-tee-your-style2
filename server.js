const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Simple in-memory "users" for demo
const users = [
  { username: 'demo', password: 'demo123', email: 'demo@example.com', mobile: '1234567890' }
];

// Routes

// Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Login API
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    res.json({ success: true, message: 'Login successful', username: user.username });
  } else {
    res.status(401).json({ success: false, message: 'Invalid username or password' });
  }
});

// Order API
app.post('/api/order', (req, res) => {
  const order = req.body;
  console.log('Order received:', order);
  // In real app: save order to DB
  res.json({ success: true, message: 'Order placed successfully!' });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  console.log(`Open your browser at http://localhost:${PORT}`);
});
