import { FastifyReply, FastifyRequest } from 'fastify'
import { UserAlreadyExistsError } from 'src/use-cases/error/user-already-exists-error'
import { makeRegisterUseCase } from 'src/use-cases/factories/make-register-user-case'
import type { RegisterBodySchema } from './schemas/register.schema'

export async function register(
  request: FastifyRequest<{ Body: RegisterBodySchema }>,
  reply: FastifyReply
) {
  const { name, email, password } = request.body

  try {
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
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }
    throw err
  }
}
