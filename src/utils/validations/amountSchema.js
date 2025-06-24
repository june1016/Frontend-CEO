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

export const rawMaterialSchema = z.object({
  quantity: z.preprocess((val) => Number(val), z.number().min(0)),
  unit_cost: z.preprocess((val) => Number(val), z.number().min(0))
});

export const productInventorySchema = z.object({
  quantity: z.preprocess((val) => Number(val), z.number().min(0)),
  unit_cost: z.preprocess((val) => Number(val), z.number().min(0))
});