import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';
import * as CustomErrors from '../errors/index.js'
import { jwt } from '../utils/index.js';


export const register = async (req, resp) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  const JWT_LIFETIME = process.env.JWT_LIFETIME;

  const { email, name, password } = req.body;
  const emailAlreadyExists = await User.findOne({ email });

  // check exists user email with controller
  if (emailAlreadyExists) {
    throw new CustomErrors.BadRequestError('Email already exists')
  }
  // first email user is admin
  const isFirstUser = await User.countDocuments({})
  const role = isFirstUser ? 'user' : 'admin';

  const user = await User.create({ name, email, password, role });

  const tokenUser = {
    name: user.name,
    userId: user._id,
    role: user.role,
  };
  const token = jwt.createJWT({ payload: tokenUser })

  resp.status(StatusCodes.CREATED).json({ user: tokenUser, token });
};

export const login = async (req, resp) => {
  resp.send('login user');
};

export const logout = async (req, resp) => {
  resp.send('logout user');
};
