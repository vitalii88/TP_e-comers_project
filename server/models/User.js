import mongoose from 'mongoose';
// import validator from 'validator';
import validator from 'validator/es';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    minlength: 3,
    maxlength: 20,
  },
  email: {
    type: String,
    required: [true, 'Please, provide email'],
    validate: {
      validator: validator.isEmail,
      message: 'Please, provide valid email'
    }
  },
  password: {
    type: String,
    required: [true, 'Please, provide password'],
    minlength: 6,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
});

export default mongoose.model('User', UserSchema);
