import { z } from 'zod';

export const loginSchema = z.object({
  accessKey: z.string().min(1, 'Chave de acesso é obrigatória'),
  username: z.string().min(1, 'Usuário é obrigatório'),
  password: z.string().min(1, 'Senha é obrigatória'),
});

export type LoginFormData = z.infer<typeof loginSchema>;