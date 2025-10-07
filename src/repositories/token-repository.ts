export interface BlacklistTokenRepository {
  blacklistToken(token: string, ttlInSeconds: number): Promise<void>
  isTokenBlacklisted(token: string): Promise<boolean>
}
