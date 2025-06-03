import { z } from "zod";

export const groupSchema = z.object({
  name: z.string()
    .min(1, "El nombre del grupo es obligatorio")
    .max(20, "El nombre del grupo puede tener máximo 20 caracteres"),

  description: z.string()
    .min(1, "La descripción del grupo es obligatorio")
    .max(60, "La descripción del grupo puede tener máximo 60 caracteres"),

  teacher: z.number({
    required_error: "Debes seleccionar un docente",
    invalid_type_error: "Debes seleccionar un docente",
  }),

  university: z.number({
    required_error: "Debes seleccionar una universidad",
    invalid_type_error: "Debes seleccionar un docente",
  }),

  students: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      lastName: z.string(),
    })
  )
    .min(1, "Debes seleccionar al menos un estudiante"),
});