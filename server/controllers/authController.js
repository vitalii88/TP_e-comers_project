import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';
import * as CustomErrors from '../errors/index.js'
import { jwtUtils } from '../utils/index.js';


export const register = async (req, resp) => {
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

  jwtUtils.attachCookieToResponse({ resp, user: tokenUser });
  resp.status(StatusCodes.CREATED).json({ user: tokenUser });
};

export const login = async (req, resp) => {
  resp.send('login user');
};

export const logout = async (req, resp) => {
  resp.send('logout user');
};
