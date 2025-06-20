import { z } from "zod";

export const universitySchema = z.object({
  name: z
    .string()
    .min(1, "El nombre es obligatorio")
    .max(100, "El nombre no debe exceder los 100 caracteres"),
  city: z
    .string()
    .min(1, "La ciudad es obligatoria")
    .max(80, "La ciudad no debe exceder los 80 caracteres"),
  country: z
    .string()
    .min(1, "El país es obligatorio")
    .max(80, "El país no debe exceder los 80 caracteres")
});