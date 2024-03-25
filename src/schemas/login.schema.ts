import { z } from "zod";

export const LoginSchema = z.object({
  username: z
    .string()
    .min(1, { message: 'Nome é obrigatório' }),
  password: z
    .string()
    .min(1, { message: 'Senha é obrigatória' })
})

export type User = z.infer<typeof LoginSchema>