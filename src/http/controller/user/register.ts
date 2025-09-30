import type { RegisterRequest } from 'types/user'
import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaUsersRepository } from 'src/repositories/prisma/prisma-users-repository'
import { UserAlreadyExistsError } from 'src/use-cases/error/user-already-exists-error'
import { RegisterUseCase } from 'src/use-cases/register'
import { z } from 'zod'

export async function register(request: RegisterRequest, reply: FastifyReply) {
  console.log('Body recebido do Multer:', (request as any).body)
  console.log('File recebido do Multer:', (request as any).file)

  const registerBodySchema = z.object({
    name: z.string().min(3).max(100),
    email: z.string().email(),
    password: z.string().min(8).max(50),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  const fileData = request.file // já é o objeto do multer
  const avatarUrl = fileData ? `/uploads/${fileData.filename}` : null

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
