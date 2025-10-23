import z from 'zod'

export const profileResponseSchema = z.object({
  user: z.object({
    id: z.uuid(),
    name: z.string(),
    avatarUrl: z.url(),
  }),
})

export const profileSchema = {
  tags: ['Profile'],
  description: 'Get user profile information',
  security: [{ BearerAuth: [] }],
  response: {
    200: profileResponseSchema,
  },
}
