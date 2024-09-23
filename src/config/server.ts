import { cleanEnv, makeValidator, port, str, bool } from "envalid";
import * as dotenv from "dotenv";

dotenv.config();

const minLength = makeValidator((value: string) => {
  if (!(value.length <= 25)) return value;
  throw new Error('La variable debe tener mínimo 25 caracteres');
});
// Validador personalizado para nombres de dominio
const domainValidator = makeValidator((value: string) => {
  if (/^([a-zA-Z0-9-_]+\.)*[a-zA-Z0-9-_]+$/.test(value)) return value;
  else throw new Error('Invalid domain name');
});

export const config = {
  server: cleanEnv(process.env, {
    HOST: domainValidator(),
    PORT: port(),
    JWT_SECRET: minLength()
  }),
  POSTGRES: cleanEnv(process.env, {
    DB_HOST: domainValidator(),
    DB_PORT: port(),
    DB_NAME: str(),
    DB_username: str(),
    DB_password: str(),
    DB_synchronize: bool(),
  }),
}