import z from 'zod'

export const authenticateBodySchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(50),
})

export type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>

export const authenticateResponseSchema = z.object({
  token: z.string().describe('JWT token generated after login'),
  id: z.uuid(),
  name: z.string(),
  email: z.email(),
})

export const authenticateSchema = {
  tags: ['Users'],
  description: 'Authenticate a user and return a token',
  security: [{ BearerAuth: [] }],
  body: authenticateBodySchema,
  response: {
    200: authenticateResponseSchema,
    409: z.object({
      message: z.string().default('Invalid credentials'),
      statusCode: z.number().default(400),
    }),
  },
}
