import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "И-мэйл хаягаа оруулна уу" }),
  password: z.string().min(1, {
    message: "Нууц үгээ оруулана уу",
  }),
});

export const generalSchema = z.object({
  about: z.optional(z.string()),
  firstName: z.string().min(1, {
    message: "Password is required",
  }),
  lastName: z.string().min(1, {
    message: "Password is required",
  }),
  registerID: z.string().min(1, {
    message: "Password is required",
  }),
  gender: z.optional(z.string()),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({ message: "И-мэйл хаягаа оруулна уу" }),
});

export const RegisterSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6, {
      message: "Minimum 6 characters required",
    }),
    confirmPassword: z.string().min(6),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Нүүг үг таарсангүй",
        path: ["confirmPassword"],
      });
    }
  });