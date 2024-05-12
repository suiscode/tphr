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

export const contactSchema = z.object({
  phoneNumber: z.string().min(1, {
    message: "Phone number is required",
  }),
  address: z.optional(z.string()),
  instagram: z.optional(z.string()),
  facebook: z.optional(z.string()),
  linkedin: z.optional(z.string()),
});

export const careerPathSchema = z.object({
  career: z.string().min(1, {
    message: "Field is required",
  }),
  salaryExpectency: z.string().min(1, {
    message: "Field is required",
  }),
  workDuration: z.string().min(1, {
    message: "Field is required",
  }),
});

export const educationSchema = z.object({
  GPA: z.optional(z.string()),
  schoolName: z.string().min(1, {
    message: "Field is required",
  }),
  schoolCountry: z.string().min(1, {
    message: "Field is required",
  }),
  degree: z.string().min(1, {
    message: "Field is required",
  }),
});

export const NewPasswordSchema = z
  .object({
    password: z.string().min(6, {
      message: "Minimum 6 characters required",
    }),
    confirmPassword: z.string().min(6, {
      message: "Minimum 6 characters required",
    }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Password does not match",
        path: ["confirmPassword"],
      });
    }
  });

export const ResetSchema = z.object({
  email: z.string().email({ message: "Enter your email" }),
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

export const ChangePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, {
      message: "Field is  required",
    }),
    password: z.string().min(6, {
      message: "Minimum 6 characters required",
    }),
    confirmPassword: z.string().min(6, {
      message: "Minimum 6 characters required",
    }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Password does not match",
        path: ["confirmPassword"],
      });
    }
  });
