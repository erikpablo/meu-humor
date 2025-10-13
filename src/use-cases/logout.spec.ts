import { describe, it, expect, beforeEach, vi } from 'vitest'
import { RevokeTokenUseCase } from '@/use-cases/logout'
import { MissingTokenError } from './error/missing-token-error'
import { InMemoryBlacklistTokenRepository } from '@/repositories/in-memory/in-memory-black-list-repository'

let blacklistRepository: InMemoryBlacklistTokenRepository
let sut: RevokeTokenUseCase

describe('RevokeTokenUseCase', () => {
  beforeEach(() => {
    blacklistRepository = new InMemoryBlacklistTokenRepository()
    sut = new RevokeTokenUseCase(blacklistRepository)
  })

  it('should throw MissingTokenError if token is missing', async () => {
    await expect(() =>
      sut.execute({ token: '', expiresAt: 123456 })
    ).rejects.toBeInstanceOf(MissingTokenError)

    await expect(() =>
      sut.execute({ token: 'abc', expiresAt: 0 })
    ).rejects.toBeInstanceOf(MissingTokenError)
  })

  it('should not blacklist token if it is already expired', async () => {
    const now = Math.floor(Date.now() / 1000)
    await sut.execute({ token: 'expired-token', expiresAt: now - 10 })

    expect(blacklistRepository.blacklistedTokens).toHaveLength(0)
  })

  it('should blacklist token if valid', async () => {
    const now = Math.floor(Date.now() / 1000)
    const expiresAt = now + 60 // 1 minuto

    await sut.execute({ token: 'valid-token', expiresAt })

    expect(blacklistRepository.blacklistedTokens).toHaveLength(1)
    expect(blacklistRepository.blacklistedTokens[0].token).toBe('valid-token')
    expect(blacklistRepository.blacklistedTokens[0].ttl).toBeGreaterThan(0)
  })
})
