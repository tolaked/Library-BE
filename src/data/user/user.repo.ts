import { connection } from "mongoose";
import { User } from "./user.model";
import { UserSchema } from "./user.schema";
import { BaseRepository } from "../database";

class UserRepository extends BaseRepository<User> {
  constructor() {
    super(connection, "User", UserSchema);
  }
}

export const UserRepo = new UserRepository();
