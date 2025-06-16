import { z } from "zod";

export const amountSchema = z.object({
  amount: z
    .string()
    .transform((val) => Number(val.replace(",", ".")))
    .refine((val) => !isNaN(val), {
      message: "El valor debe ser un número válido",
    })
    .refine((val) => val >= 0, {
      message: "El valor no puede ser negativo",
    })
    .refine((val) => val <= 100_000_000_000, {
      message: "El valor no puede superar los 100 billones de pesos",
    }),
});