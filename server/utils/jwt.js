import jwt from 'jsonwebtoken';

export const createJWT = ({ payload }) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  const JWT_LIFETIME = process.env.JWT_LIFETIME;

  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_LIFETIME,
  });
  return token;
};

export const isTokenValid = ({ token }) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  const isValid = jwt.verify(token, JWT_SECRET);

  return isValid;
};

export const attachCookieToResponse = ({ resp, user }) => {
  const token = createJWT({ payload: user });
  const oneDay = 1000 * 60 * 60 * 24;

  resp.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production',
    signed: true,
  });
}
