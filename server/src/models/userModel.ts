import { z } from 'zod';


export const userSchema = z.object({
  id: z.number(),
  user_name: z.string(),
  email: z.string().email(),
  password: z.string(),
  updated_at: z.string(),   
  created_at: z.string(),   
});


export const registerSchema = z.object({
  user_name: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters' })
    .max(20, { message: 'Username must be under 20 characters' })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: 'Username can only contain letters, numbers, and underscores',
    }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .refine(
      (val) =>
        /[A-Z]/.test(val) &&
        /[a-z]/.test(val) &&
        /[0-9]/.test(val) &&
        /[^A-Za-z0-9]/.test(val),
      {
        message:
          'Password must include uppercase, lowercase, number, and special character',
      }
    ),
});



export type User = z.infer<typeof userSchema>;