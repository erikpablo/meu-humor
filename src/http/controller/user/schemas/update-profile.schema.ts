import z from 'zod'

export const updateProfileBodySchema = z.object({
  name: z.string(),
  oldPassword: z.string().min(8),
  newPassword: z.string().min(8),
  confirmNewPassword: z.string().min(8),
})

export const updateProfileErrorSchema = z.object({
  message: z.string(),
})

export const updateProfileSchema = {
  tags: ['Profile'],
  description: 'Updates the authenticated users profile',
  security: [{ BearerAuth: [] }],
  body: updateProfileBodySchema,
  response: {
    204: z.null(),
    409: updateProfileErrorSchema,
  },
}
