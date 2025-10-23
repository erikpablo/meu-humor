import z from 'zod'

export const moodEntryBodySchema = z.object({
  moodTypeId: z.string(),
  note: z.string().optional(),
})

const errorResponseSchema = z.object({
  message: z.string(),
})

export const profileSchema = {
  tags: ['Mood'],
  description: 'Allows the user to record their mood for the day.',
  security: [{ BearerAuth: [] }],
  body: moodEntryBodySchema,
  response: {
    204: z.null(),
    400: errorResponseSchema,
  },
}
