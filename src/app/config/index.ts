import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join((process.cwd(), ".env")) });

export default {
  NODE_ENV: process.env.NODE_ENV,
  prot: process.env.USER_PROT,
  database_url: process.env.DATABASE_URL,
  data_salt_rounds: process.env.DATA_SALT_ROUNDS,
  default_password: process.env.DEPFULT_PASS,
  jwt_access_secret: process.env.JWT_ACCESS_TOKEN,
  jwt_refreshtoken: process.env.JWT_REFRESH_TOKEN,
  jwt_assess_exrpired: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_exrpired: process.env.JWT_REFRESH_EXPIRES_IN,
};
