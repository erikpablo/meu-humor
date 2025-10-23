import { FastifyRequest, FastifyReply } from 'fastify'
import { InvalidCredentialsError } from 'src/use-cases/error/invalid-credentials-error'
import { makeAuthenticateUseCase } from 'src/use-cases/factories/make-authenticate-use-case'
import { authenticateBodySchema } from './schemas/authenticate.schema'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateUseCase = makeAuthenticateUseCase()

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
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }
    throw err
  }
}
