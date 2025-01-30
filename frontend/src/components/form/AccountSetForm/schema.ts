import { z } from 'zod'

export const schema = z.object({
  domain: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  messageKey: z.string().optional().or(z.literal('')),
  nftokenMinter: z.string().optional().or(z.literal('')),
  transferRate: z.number().optional().or(z.literal(0)),
  tickSize: z
    .number()
    .optional()
    .refine((n) => n !== undefined && n >= 3 && n <= 15, 'Invalid tick size')
    .or(z.literal(0)),
  flag: z.number().optional().or(z.literal(0)),
  clearFlag: z.boolean().optional().or(z.literal(false))
})
