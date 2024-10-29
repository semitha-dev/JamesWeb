const express = require('express');
const cors = require('cors'); // Import CORS
const http = require('http');
const connectDB = require('./db');
const Message = require('./models/newpostmodel');

// Connect to the database
connectDB();

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Route to add a new post
app.post('/addPost', async (req, res) => {
  try {
    const { content } = req.body;
    const newMessage = new Message({ content });
    await newMessage.save();
    res.status(201).send('Post added');
  } catch (error) {
    console.error('Error saving message:', error); // Log the error to the console
    res.status(500).send('Error saving message');
  }
});

app.get('/getPosts', async (req, res) => { 
  try {
    const messages = await Message.find();
    res.send(messages);
  } catch (error) {
    console.error('Error fetching messages:', error); // Log the error to the console
    res.status(500).send('Error fetching messages');
  }
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
