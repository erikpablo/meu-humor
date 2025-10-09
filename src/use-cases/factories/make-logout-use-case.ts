import { RedisBlacklistTokenRepository } from '@/repositories/redis/black-list-token-repository'
import { RevokeTokenUseCase } from '../logout'
import type { FastifyRedis } from '@fastify/redis'

export function makeRevokeTokenUseCase(redis: FastifyRedis) {
  const blacklistRepo = new RedisBlacklistTokenRepository(redis)
  const revokeTokenUseCase = new RevokeTokenUseCase(blacklistRepo)

  return revokeTokenUseCase
}
