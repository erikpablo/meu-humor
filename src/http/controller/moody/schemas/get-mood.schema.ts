import z from 'zod'

export const querySchema = z.object({
  start_date: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/), // DD/MM/YYYY
  end_date: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/), // DD/MM/YYYY
  order: z.enum(['asc', 'desc']).optional(),
  limit: z.string().regex(/^\d+$/).optional(),
})

export type GetMoodQuerySchema = z.infer<typeof querySchema>
