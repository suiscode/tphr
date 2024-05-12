import { User } from "@/app/api/model";
import { connectToDb } from "@/app/api/utilts";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";

export const getUserFromCookie = async ({ withCV }: { withCV: boolean }) => {
  const cookieStore = cookies();
  const cookie = cookieStore.get("cookie");
  const decoded = jwt.verify(
    cookie?.value as string,
    process.env.ACCESS_TOKEN_SECRET as string
  ) as JwtPayload;
  const { _id } = decoded.user;
  connectToDb();
  if (withCV) {
    const user = await User.findById(_id).populate("cv");
    return user;
  } else {
    const user = await User.findById(_id);
    return user;
  }
};

export const getAllUser = async () => {
  connectToDb();
  const users = await User.find();
  return users;
};
