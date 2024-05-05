const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'https://addand-update-vakj.vercel.app/'
  }));
  

let data = {};
let addCount = 0; 
let updateCount = 0; 

// API to add new data
app.post('/add', (req, res) => {
  data = req.body; 
  addCount++; 
  res.status(201).send('Data added successfully');
});

// API to update existing data
app.patch('/update', (req, res) => {
  data = { ...data, ...req.body }; 
  updateCount++; 
  res.send('Data updated successfully');
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

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
