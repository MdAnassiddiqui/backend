const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'https://addand-update-vakj.vercel.app'
}));

let items = []; 
let addCount = 0; 
let updateCount = 0; 

app.post('/add', (req, res) => {
  try {
    const newItem = req.body; 
    console.log('New Item:', newItem); // Log the received data
    items.push(newItem);
    addCount++; 
    res.status(201).send('Data added successfully');
  } catch (error) {
    console.error("Error adding data:", error);
    res.status(500).send('Internal Server Error');
  }
});

app.patch('/update', (req, res) => {
  try {
    const updatedItem = req.body;
    console.log('Updated Item:', updatedItem); // Log the received data
    const index = items.findIndex(item => item.id === updatedItem.id);
    if (index !== -1) {
      items[index] = updatedItem;
      updateCount++; 
      res.send('Data updated successfully');
    } else {
      res.status(404).send('Item not found');
    }
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).send('Internal Server Error');
  }
});


app.get('/count', (req, res) => {
  res.json({ addCount, updateCount });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
