import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().min(1, 'Usuário é obrigatório'),
  password: z.string().min(1, 'Senha é obrigatória'),
});

export type LoginFormData = z.infer<typeof loginSchema>;