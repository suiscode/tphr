import { PasswordResetToken } from "@/app/api/model";
import { v4 as uuidv4 } from "uuid";

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 60 * 1000);

  const existingToken = await PasswordResetToken.findOne({ email });
  if (existingToken) {
    await PasswordResetToken.findOneAndDelete({ id: existingToken.id });
  }

  const passwordResetToken = await PasswordResetToken.create({
    email,
    token,
    expires,
  });

  return passwordResetToken;
};
