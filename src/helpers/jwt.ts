import * as jwt from "jsonwebtoken";
import * as env from "dotenv";
env.config();
const { ACCESS_TOKEN_SECRET,REFRESH_TOKEN_SECRET } = process.env;
const jwtToken = {
  sign(username:object){
    return jwt.sign(username, ACCESS_TOKEN_SECRET!,{expiresIn:'48h'})
  },
  signRefresh(username:object){
    return jwt.sign(username, REFRESH_TOKEN_SECRET!,{expiresIn:'1y'})
  },
  vreifyRefreshToken(refreshToken:string):any{
    let username ;
    jwt.verify(refreshToken,REFRESH_TOKEN_SECRET!,(err,payload:any)=>{
      if(err)  throw err;
      username = payload.username || null
    })
    return username
  }
}
export default jwtToken