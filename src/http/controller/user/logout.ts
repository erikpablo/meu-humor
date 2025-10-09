import { makeRevokeTokenUseCase } from '@/use-cases/factories/make-logout-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { RedisBlacklistTokenRepository } from 'src/repositories/redis/black-list-token-repository'
import { RevokeTokenUseCase } from 'src/use-cases/logout'
import { messages } from 'utils/messages'

interface UserPayload {
  sub: string
  exp: number
  iat: number
}

export type AuthenticatedRequest = FastifyRequest & { user: UserPayload }

export async function logout(
  request: AuthenticatedRequest,
  reply: FastifyReply
) {
  try {
    const authHeader = request.headers.authorization
    const token = authHeader?.split(' ')[1]

    if (!token) {
      return reply.code(400).send({ messages: messages.missingToken })
    }

    const expiresAt = request.user?.exp
    if (!expiresAt) {
      return reply.code(400).send({ message: messages.invalidToken })
    }

    const revokeTokenUseCase = makeRevokeTokenUseCase(request.server.redis)

    // Evita revogar tokens já expirados
    const now = Math.floor(Date.now() / 1000)
    if (expiresAt < now) {
      return reply.code(400).send({ message: messages.invalidToken })
    }

    await revokeTokenUseCase.execute({ token, expiresAt })

    return reply.code(200).send({ message: messages.success })
  } catch (err) {
    request.log.error(err, messages.logs.redisError)
    return reply.code(500).send({ message: messages.internalError })
  }
}
