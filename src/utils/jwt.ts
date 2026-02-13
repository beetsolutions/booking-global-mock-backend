import jwt, { SignOptions } from 'jsonwebtoken';

export const generateToken = (id: string): string => {
  const secret = process.env.JWT_SECRET || 'secret';
  const expiresIn = (process.env.JWT_EXPIRE || '7d') as SignOptions['expiresIn'];
  return jwt.sign({ id }, secret, {
    expiresIn
  });
};

export const verifyToken = (token: string): any => {
  const secret = process.env.JWT_SECRET || 'secret';
  return jwt.verify(token, secret);
};
