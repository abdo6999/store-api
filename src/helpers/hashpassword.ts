import * as bcrypt from "bcrypt";
import * as env from "dotenv";
env.config();
const { pepper, saltRounds } = process.env;
const hashpass = {
   hash(password:string):string {
    return bcrypt.hashSync(password + pepper, parseInt(saltRounds!))
  },
   compare(password:string,inputpassword:string):boolean {
    password = password + pepper
    return bcrypt.compareSync(password, inputpassword)
  }
} 
export default hashpass
