import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join((process.cwd(), ".env")) });

export default {
  prot: process.env.USER_PROT,
  database_url: process.env.DATABASE_URL,
  data_salt_rounds : process.env.DATA_SALT_ROUNDS,
  default_password:process.env.DEPFULT_PASS
};
