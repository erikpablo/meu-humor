import { Prisma } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, replay: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string().min(3).max(100),
    email: z.string().email(),
    password: z.string().min(8).max(50),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)
  // validacao de email
  // hash de senha

  await Prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  })
}
