import { UnauthenticatedError } from '../errors/index.js';
import { jwtUtils } from '../utils/index.js';

const authenticateUser = async (req, resp, next) => {
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

export default authenticateUser;
