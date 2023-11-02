const express = require('express');
const app = express();
const data = require('./data.json');
// Create a new item
app.post('/items', (req, res) => {
    const newItem = {
      id: data.items.length + 1,
      name: req.body.name,
      description: req.body.description,
    };
    data.items.push(newItem);
    res.status(201).json(newItem);
  });
  
  // Read all items
  app.get('/items', (req, res) => {
    res.json(data.items);
  });
  
  // Read an item by ID
  app.get('/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const item = data.items.find((item) => item.id === itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
  });
  
  // Update an item by ID (PUT)
  app.put('/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const updatedItem = data.items.find((item) => item.id === itemId);
    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    updatedItem.name = req.body.name || updatedItem.name;
    updatedItem.description = req.body.description || updatedItem.description;
    res.json(updatedItem);
  });
  
  // Partially update an item by ID (PATCH)
  app.patch('/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const updatedItem = data.items.find((item) => item.id === itemId);
    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    if (req.body.name) {
      updatedItem.name = req.body.name;
    }
    if (req.body.description) {
      updatedItem.description = req.body.description;
    }
    res.json(updatedItem);
  });
  
  // Delete an item by ID
  app.delete('/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const index = data.items.findIndex((item) => item.id === itemId);
    if (index === -1) {
      return res.status(404).json({ message: 'Item not found' });
    }
    data.items.splice(index, 1);
    res.json({ message: 'Item deleted successfully' });
  });
  
  // Add more routes for other scenarios as needed...
  
  // Start the server
  const port = process.env.PORT || 8080;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  