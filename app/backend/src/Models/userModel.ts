import User from '../database/models/UserModel';
import { IUser } from '../interfaces/userInterface';

export default class UserModel {
  private _Model = User;

  async findOne(email: string): Promise<IUser | null> {
    const result = await this._Model.findOne({ where: { email } });
    return result;
  }
}
