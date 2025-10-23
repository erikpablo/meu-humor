import z from 'zod'

export const moodEntryBodySchema = z.object({
  moodTypeId: z.string(),
  note: z.string().optional(),
})

export const profileSchema = {
  tags: ['Mood'],
  description: 'Allows the user to record their mood for the day.',
  security: [{ BearerAuth: [] }],
  body: moodEntryBodySchema,
  response: {
    204: z.null(),
    400: z.string().default('Missing or invalid data'),
  },
}
