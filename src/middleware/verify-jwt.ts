import { FastifyReply, FastifyRequest } from 'fastify'
import { RedisBlacklistTokenRepository } from 'src/repositories/redis/black-list-token-repository'
import { messages } from 'utils/messages'

export async function verifyJWT(request: FastifyRequest, reply: FastifyReply) {
  const authHeader = request.headers.authorization

  if (!authHeader?.startsWith('Bearer ')) {
    return reply.code(401).send({ message: messages.missingBearer })
  }

  const token = authHeader.split(' ')[1]

  try {
    await request.jwtVerify()

    const blacklistRepo = new RedisBlacklistTokenRepository(
      request.server.redis
    )
    const isBlacklisted = await blacklistRepo.isTokenBlacklisted(token)

    if (isBlacklisted) {
      return reply.code(401).send({ message: messages.invalidJWT })
    }
  } catch (err) {
    request.log.error(err, 'JWT verification failed')
    return reply.code(401).send({ message: messages.revokedJWT })
  }
}
