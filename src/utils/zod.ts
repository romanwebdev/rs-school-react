import { z } from 'zod';

const MAX_FILE_SIZE = 1 * 1024 * 1024;
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];

export const formSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Name is required')
      .regex(/^[A-Z]/, 'Name should start with an uppercase letter'),

    age: z
      .string()
      .transform((val) => Number(val))
      .refine((val) => !isNaN(val) && val > 0, {
        message: 'Age must be a valid number and cannot be negative',
      }),

    email: z.string().email('Please provide a valid email address'),

    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(
        /[^A-Za-z0-9]/,
        'Password must contain at least one special character'
      ),

    confirmPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters'),

    gender: z.enum(['male', 'female'], {
      errorMap: () => ({ message: 'Please select a gender' }),
    }),

    terms: z.boolean().refine((val) => val === true, {
      message: 'You must accept the terms and conditions',
    }),

    image: z
      .any()
      .refine((file) => (file?.size || file[0]?.size) > 0, 'Image is required')
      .refine(
        (file) => (file?.size || file[0]?.size) <= MAX_FILE_SIZE,
        'File size must be less than 1MB'
      )
      .refine(
        (file) => ALLOWED_FILE_TYPES.includes(file?.type || file[0]?.type),
        'Only JPEG or PNG files are allowed'
      ),

    countries: z
      .array(z.string())
      .min(1, 'At least one country must be selected'),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords must match',
        path: ['confirmPassword'],
      });
    }
  });
