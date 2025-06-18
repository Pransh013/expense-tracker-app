import { z } from "zod";
import { ExpenseType } from "../types";

export const createTransactionSchema = z.object({
  amount: z.number().positive("Amount must be positive"),
  type: z.nativeEnum(ExpenseType),
  category: z.string().min(1, "Category is required"),
  description: z.string().optional(),
  date: z.coerce.date().optional(),
});
