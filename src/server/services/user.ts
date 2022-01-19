import { hash, compare } from "bcrypt";
import { UserRepo } from "@app/data/user/user.repo";
import { UserDTO } from "@app/data/user";
import { seal } from "@app/common/authorization";
import dotenv from "dotenv";
import { Request } from "express";

dotenv.config();

class UserService {
  async createUser(user: UserDTO){
    return await UserRepo.create({
      name: user.name,
      email_address: user.email_address,
      password: await hash(user.password, 10)
    });
  }

  async loginUser(email_address: string, password: string, req: Request) {
    const user = await UserRepo.byQuery({ email_address })
    if (user) {
      const isPassword = await compare(password, user.password)
      if (!isPassword) {
        throw new Error("Email or Password is incorrect")
      }

      const token = await seal(user, process.env.secret, "24h", req)
      //@ts-ignore
      return {token,user}
    }
  }
}
export const UserSer = new UserService();
