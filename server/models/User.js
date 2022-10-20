import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    minlength: 3,
    maxlength: 20,
  },
  email: {
    type: String,
    // check exists user email with Schema
    unique: true,
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

UserSchema.pre('save', async function() {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

});

UserSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
}

export default mongoose.model('User', UserSchema);
