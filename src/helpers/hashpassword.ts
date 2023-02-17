import * as bcrypt from "bcrypt";
import * as env from "dotenv";
env.config();
const { PEPPER, SALT_ROUNDS } = process.env;
const hashpass = {
  hash(password: string): string {
    return bcrypt.hashSync(password + PEPPER, parseInt(SALT_ROUNDS!));
  },
  compare(password: string, inputpassword: string): boolean {
    password = password + PEPPER;
    return bcrypt.compareSync(password, inputpassword);
  }
};
export default hashpass;
