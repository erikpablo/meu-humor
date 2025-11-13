import { FastifyRequest, FastifyReply } from 'fastify'
import { makeAuthenticateUseCase } from 'src/use-cases/factories/make-authenticate-use-case'
import { authenticateBodySchema } from './schemas/authenticate.schema'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { email, password } = authenticateBodySchema.parse(request.body)

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
}
