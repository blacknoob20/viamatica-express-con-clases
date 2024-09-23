import { JwtHelper } from '@/shared/helpers';
import { UserRepository } from '../repositories/user.repositoriy';
import { UserLoginInterface } from '../interfaces';

export class UserService {
  async get() {
    const allUsers = new UserRepository();
    return await allUsers.getAllUsers();
  }

  login(user: UserLoginInterface) {
    const jwtHelper = new JwtHelper();

    return jwtHelper.create({
      data: user,
      date: new Date().toISOString(),
    });
  }
}