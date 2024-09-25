import { JwtHelper } from '@/shared/helpers';
import { UserRepository } from '../repositories/user.repositoriy';
import { UserI, UserLoginInterface } from '../interfaces';

export class UserService {
  async getUser(id: number) {
    const user = new UserRepository();
    return await user.getFindOne(id);
  }

  async getAllUsers() {
    const allUsers = new UserRepository();
    return await allUsers.getAllUsers();
  }

  async createUser(user: UserI) {
    const allUsers = new UserRepository();
    return await allUsers.createUser(user);
  }

  login(user: UserLoginInterface) {
    const jwtHelper = new JwtHelper();

    return jwtHelper.create({
      data: user,
      date: new Date().toISOString(),
    });
  }
}