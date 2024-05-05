const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'https://addand-update-vakj.vercel.app/'
}));

let items = [];
let addCount = 0;
let updateCount = 0;

// API to add new data
app.post('/add', (req, res) => {
  const newItem = req.body; 
  items.push(newItem);
  addCount++; 
  res.status(201).send('Data added successfully');
});

// API to update existing data
app.patch('/update', (req, res) => {
  const updatedItem = req.body;
  const index = items.findIndex(item => item.id === updatedItem.id);
  if (index !== -1) {
    items[index] = updatedItem;
    updateCount++; 
    res.send('Data updated successfully');
  } else {
    res.status(404).send('Item not found');
  }
});

app.get('/count', (req, res) => {
  res.json({ addCount, updateCount });
});

app.get('/addCount', (req, res) => {
  res.json({ addCount });
});

app.get('/updateCount', (req, res) => {
  res.json({ updateCount });
});

// Handle root URL
app.get('/', (req, res) => {
  res.send('Welcome to the backend API!');
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
