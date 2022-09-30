import { compareSync } from 'bcryptjs';
import createToken from '../utils/CreateToken';
import { IUserLogin } from '../interfaces/userInterface';
import CustomError from '../middleware/customError';
import User from '../database/models/UserModel';

export default class LoginService {
  login = async (user: IUserLogin) => {
    const { email, password } = user;
    const userFound = await User.findOne({ where: { email } });
    if (!userFound) {
      throw new CustomError(401, 'Incorrect email or password');
    }
    const validatePassword = compareSync(password, userFound.password);
    if (!validatePassword) {
      throw new CustomError(401, 'Incorrect email or password');
    }
    const token = createToken(userFound.email);
    return token;
  };
}
