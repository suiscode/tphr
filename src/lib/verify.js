import { jwtVerify, SignJWT } from "jose";

export const verifyAuth = async (token) => {
  const verified = await jwtVerify(
    token,
    new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET)
  );

  if (verified.payload.user.role !== "ADMIN") {
    return false;
  } else {
    return true;
  }
};
