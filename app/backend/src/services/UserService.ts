import { compareSync } from 'bcryptjs';
import createToken from '../utils/CreateToken';
import { IUserLogin } from '../interfaces/userInterface';
import CustomError from '../middleware/customError';

import UserModel from '../Models/userModel';

export default class LoginService {
  constructor(private Model = new UserModel()) {}

  public async login(user: IUserLogin) {
    const { email, password } = user;
    const userFound = await this.Model.findOne(email);
    console.log(userFound);
    if (!userFound) {
      throw new CustomError(401, 'Incorrect email or password');
    }
    const validatePassword = compareSync(password, userFound.password);
    if (!validatePassword) {
      throw new CustomError(401, 'Incorrect email or password');
    }
    const token = createToken(userFound.email);
    return token;
  }
}
