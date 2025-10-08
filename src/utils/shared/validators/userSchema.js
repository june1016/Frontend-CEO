import { z } from "zod";

export const userSchema = z
  .object({
    name: z
      .string()
      .min(2, "El nombre debe tener al menos 2 caracteres")
      .max(50, "El nombre es demasiado largo"),
    lastName: z
      .string()
      .min(2, "El apellido debe tener al menos 2 caracteres")
      .max(50, "El apellido es demasiado largo"),
    email: z
      .string()
      .min(1, "El correo es obligatorio")
      .email("Correo no válido"),
    password: z.string().optional(), 
    rol: z.number({
    required_error: "Debes seleccionar un rol",
    invalid_type_error: "Debes seleccionar un rol",
  }),
    isEditing: z.boolean(),
  })
  .superRefine((data, ctx) => {
    if (!data.isEditing) {
      const pwd = data.password?.trim() || "";

      if (!pwd) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["password"],
          message: "La contraseña es obligatoria",
        });
        return;
      }

      if (pwd.length < 8) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          path: ["password"],
          minimum: 8,
          type: "string",
          message: "La contraseña debe tener al menos 8 caracteres",
        });
      }

      if (pwd.length > 50) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_big,
          path: ["password"],
          maximum: 50,
          type: "string",
          message: "La contraseña es demasiado larga",
        });
      }

      if (!/[A-Z]/.test(pwd)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["password"],
          message: "La contraseña debe contener al menos una mayúscula",
        });
      }

      if (!/[0-9]/.test(pwd)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["password"],
          message: "La contraseña debe contener al menos un número",
        });
      }

      if (!/[^A-Za-z0-9]/.test(pwd)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["password"],
          message: "La contraseña debe contener al menos un carácter especial",
        });
      }
    }
  });
