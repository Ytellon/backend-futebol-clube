import * as jwt from 'jsonwebtoken';

import * as dotenv from 'dotenv';

dotenv.config();

const wordSecretJwt = process.env.JWT_SECRET as string;

const createToken = (payload: string): string => {
  const jwtConfig: object = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ data: payload }, wordSecretJwt, jwtConfig);
  return token;
};

export default createToken;
