import { UnauthenticatedError, UnauthorizedError } from '../errors/index.js';
import { jwtUtils } from '../utils/index.js';

export const authenticateUser = async (req, resp, next) => {
  const token = req.signedCookies.token

  if (!token) {
    throw new UnauthenticatedError('Authentication Invalid');
  }

  try {
    const { name, userId, role } = jwtUtils.isTokenValid({token});
    req.user = { name, userId, role };
    next();

  } catch (error) {
    throw new UnauthenticatedError('Authentication Invalid');
  }
};

export const authorizePermission = (...roles) => {
  return (req, resp, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError('Unauthorizen to access this route');
    }
    next();
  };
};

