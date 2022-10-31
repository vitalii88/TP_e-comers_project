import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';
import { CustomApiError, NotFoundError } from '../errors/index.js'

export const getAllUsers = async (req, resp) => {
  const users = await User.find({ role: 'user' }).select('-password');
  // .select('-password') - remove password with data
  resp.status(StatusCodes.OK).json({users});
};

export const getSingleUser = async (req, resp) => {
  const user = await User.findOne({ _id: req.params.id }).select('-password');

  if (!user) {
    throw new NotFoundError(`Not found user with id: ${req.params.id}`);
  }

  resp.status(StatusCodes.OK).json({ user });
};

export const showCurrentUser = async (req, resp) => {
  resp.send('showCurrentUser');
};

export const updateUser = async (req, resp) => {
  resp.send('updateUser');
};

export const updateUserPassword = async (req, resp) => {
  resp.send('updateUserPassword');
};
