import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT || 5002,
  database_url: process.env.MONGODB_URL,
  NODE_ENV: process.env.NODE_ENV,
  bcrypt_rount: process.env.BCRYPT_ROUNT,
  access_token: process.env.ACCESS_SCERET,
  ACCESS_SCERET_EXPIREIN: process.env.ACCESS_SCERET_EXPIREIN,
  super_admin_password: process.env.SUPER_ADMIN_PASSWORD,
};
