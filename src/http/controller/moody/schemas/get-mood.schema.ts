import z from 'zod'

export const querySchema = z.object({
  start_date: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/), // DD/MM/YYYY
  end_date: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/), // DD/MM/YYYY
  order: z.enum(['asc', 'desc']).optional(),
  limit: z.string().regex(/^\d+$/).optional(),
})

const errorResponseSchema = z.object({
  message: z.string(),
})

const getMoodsSchema = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      date: z.string(),
      weight: z.number(),
    })
  ),
})

export type GetMoodQuerySchema = z.infer<typeof querySchema>

export const MoodsSchema = {
  tags: ['Moods'],
  description: 'It allows the user to view mood records and an average.',
  security: [{ BearerAuth: [] }],
  querystring: querySchema,
  response: {
    200: getMoodsSchema,
    400: errorResponseSchema,
  },
}
