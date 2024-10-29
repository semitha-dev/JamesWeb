const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://root:cakebot211K@cluster1.88z2s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1', {
      
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Connection error', error);
    process.exit(1);
  }
};

module.exports = connectDB;
