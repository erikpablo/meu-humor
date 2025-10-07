import { FastifyRedis } from '@fastify/redis'
import crypto from 'crypto'
import { BlacklistTokenRepository } from '../token-repository'

export class RedisBlacklistTokenRepository implements BlacklistTokenRepository {
  constructor(private redis: FastifyRedis) {}

  private hashToken(token: string) {
    return crypto.createHash('sha256').update(token).digest('hex')
  }

  async blacklistToken(token: string, ttlInSeconds: number): Promise<void> {
    if (ttlInSeconds <= 0) return

    const hashed = this.hashToken(token)
    await this.redis.set(`blacklist:${hashed}`, '1', 'EX', ttlInSeconds)
  }

  async isTokenBlacklisted(token: string): Promise<boolean> {
    const hashed = this.hashToken(token)
    const isBlacklisted = await this.redis.get(`blacklist:${hashed}`)
    return Boolean(isBlacklisted)
  }
}
