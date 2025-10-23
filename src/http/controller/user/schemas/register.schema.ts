import z from 'zod'

export const registerBodySchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string().min(8),
})

export type RegisterBodySchema = z.infer<typeof registerBodySchema>

export const registerResponseSchema = z.object({
  id: z.uuid(),
  email: z.email(),
})

export const registerSchema = {
  tags: ['Users'],
  description: 'Register a new user',
  body: registerBodySchema,
  response: {
    201: registerResponseSchema,
    409: z.object({
      message: z.string().default('User already exists'),
      statusCode: z.number().default(409),
    }),
  },
}
