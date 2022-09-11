const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config()

const url = process.env.MONGO_URL || 'mongodb://localhost:27017';

mongoose.connect(url, 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  }
).then(() => {
  console.log(`Connected to Mongo Database.`);
}).catch((err) => {
  console.log(`Error connecting to MongDB: ${err}`);
});
