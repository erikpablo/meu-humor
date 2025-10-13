import type { BlacklistTokenRepository } from '../token-repository'

export class InMemoryBlacklistTokenRepository
  implements BlacklistTokenRepository
{
  public blacklistedTokens: { token: string; ttl: number }[] = []

  async blacklistToken(token: string, ttl: number) {
    this.blacklistedTokens.push({ token, ttl })
  }

  // mock do método obrigatório
  async isTokenBlacklisted(token: string) {
    return this.blacklistedTokens.some((t) => t.token === token)
  }
}
