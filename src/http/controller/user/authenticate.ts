import { FastifyRequest, FastifyReply } from 'fastify'
import { PrismaUsersRepository } from 'src/repositories/prisma/prisma-users-repository'
import { AuthenticateUseCase } from 'src/use-cases/authenticate'
import { invalidCredentialsError } from 'src/use-cases/error/invalid-credentials-error'
import { z } from 'zod'
import id from 'zod/v4/locales/id.js'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const prismaUsersRepository = new PrismaUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(prismaUsersRepository)

    const { user } = await authenticateUseCase.execute({ email, password })

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
          expiresIn: '3 days',
        },
      }
    )

    return reply
      .status(200)
      .send({ token, id: user.id, name: user.name, email: user.email })
  } catch (err) {
    if (err instanceof invalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }
    throw err
  }
}
