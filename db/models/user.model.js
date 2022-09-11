const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
	  username: {
		  type: String,
		  required: [true, 'Username is required']
	  },
	  password: {
		  type: String,
		  required: [true, 'Password is required']
	  },
	  email: {
		  type: String,
		  required: [true, 'Email is required']
	  }
  },
);

module.exports.Users = mongoose.model('User', UserSchema);
