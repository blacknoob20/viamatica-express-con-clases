import { DataBaseConfig } from '@/config/baseConfig';
import { UserEntity } from '@/entities';
import { UserI } from '../interfaces';

export class UserRepository {
  async getFindOne(id: number) {
    try {
      const cnx = await DataBaseConfig.getConnection();
      const users = await cnx.createQueryBuilder()
        .from(UserEntity, 'user')
        .where('user.id = :paramId', { paramId: id })
        .getRawOne<UserI>();

      return users;
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  }

  async getAllUsers() {
    try {
      const cnx = await DataBaseConfig.getConnection();
      const users = await cnx.createQueryBuilder()
        .select([
          'user.id as id',
          'concat(user.name,\' \', user.lastName) as fullname',
          'user.body as body'
        ])
        .from(UserEntity, 'user')
        .getRawMany<UserI>();

      return users;
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  }

  async createUser(user: UserI) {
    try {
      const cnx = await DataBaseConfig.getConnection();
      const userRepository = cnx.getRepository(UserEntity);

      const newUser = await userRepository.save(user);
      return newUser;
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  }

  async getOne() {

  }
}