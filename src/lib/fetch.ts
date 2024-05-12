import { User } from "@/app/api/model";
import { connectToDb } from "@/app/api/utilts";

export const userFetch = async (id: string) => {
  connectToDb();
  const user = await User.findById(id);
  return user;
};
