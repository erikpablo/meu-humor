import z from 'zod'

export const logoutResponseSchema = z.object({
  messages: z.string().default('Logout successful'),
})

export const logoutErrorSchema = z.object({
  message: z.string().default('Invalid or expired token'),
})

export const logoutErrorInternalSchema = z.object({
  message: z.string().default('Internal server error while logging out'),
})

export const logoutSchema = {
  tags: ['Users'],
  description: 'Logout user by revoking the token',
  security: [{ BearerAuth: [] }],
  response: {
    200: logoutResponseSchema,
    400: logoutErrorSchema,
    500: logoutErrorInternalSchema,
  },
}
