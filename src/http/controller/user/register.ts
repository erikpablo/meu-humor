import { FastifyReply, FastifyRequest } from 'fastify'
import { makeRegisterUseCase } from 'src/use-cases/factories/make-register-user-case'
import { registerBodySchema } from './schemas/register.schema'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const { name, email, password } = registerBodySchema.parse(request.body)

  const registerUseCase = makeRegisterUseCase()

  const { user } = await registerUseCase.execute({
    name,
    email,
    password,
  })

  return reply.status(201).send({
    id: user.id,
    email: user.email,
  })
}
