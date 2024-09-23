import { DataSource } from 'typeorm';
import { config } from './server';
import { MovieEntity, UserEntity } from '@/entities';

export class DataBaseConfig {
  private static cnx: DataSource;

  public static async connect() {
    try {
      DataBaseConfig.cnx = new DataSource({
        type: 'postgres',
        host: config.POSTGRES.DB_HOST,
        port: config.POSTGRES.DB_PORT,
        username: config.POSTGRES.DB_username,
        password: config.POSTGRES.DB_password,
        database: config.POSTGRES.DB_NAME,
        synchronize: config.POSTGRES.DB_synchronize,
        entities: [UserEntity, MovieEntity]
      });

      if (!DataBaseConfig.cnx.isInitialized) {
        await DataBaseConfig.cnx.initialize();
        console.info('Conectados a la base')
      }

    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  }

  public static async getConnection() {
    return this.cnx;
  }

  public static async disconnect() {
    if (DataBaseConfig.cnx) {
      await DataBaseConfig.cnx.destroy();
      console.log('Cerrando DB');
    }
  }
}

process.on('SIGINT', async () => {
  await DataBaseConfig.disconnect();
  process.exit();
})

process.on('SIGTERM', async () => {
  await DataBaseConfig.disconnect();
  process.exit();
})

