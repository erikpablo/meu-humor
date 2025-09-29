import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaUsersRepository } from 'src/repositories/prisma/prisma-users-repository'
import { UserAlreadyExistsError } from 'src/use-cases/error/user-already-exists-error'
import { RegisterUseCase } from 'src/use-cases/register'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string().min(3).max(100),
    email: z.string().email(),
    password: z.string().min(8).max(50),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  const avatarUrl = request.file ? `/uploads/${request.file.filename}` : null

  try {
    const prismaUsersRepository = new PrismaUsersRepository()
    const registerUseCase = new RegisterUseCase(prismaUsersRepository)

    const { user } = await registerUseCase.execute({
      name,
      email,
      password,
      avatarUrl,
    })

    return reply.status(201).send({
      id: user.id,
      email: user.email,
      avatarUrl: user.avatarUrl,
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }
    throw err
  }
}
