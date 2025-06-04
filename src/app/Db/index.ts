import { User } from "../../modules/user/user.model";
import config from "../config";

const superAdminInfo = {
  username: "Arafat Hossen",
  email: "arafatjibon33@gmail.com",
  password: config.super_admin_password,
  role: "superAdmin",
};

const seedSuperAdmin = async () => {
  const isSuperAdminExists = await User.findOne({ role: "superAdmin" });
  if (!isSuperAdminExists) {
    await User.create(superAdminInfo);
  }
};

export default seedSuperAdmin;
