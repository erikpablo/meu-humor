import { BlacklistTokenRepository } from 'src/repositories/token-repository'
import { MissingTokenError } from './error/missing-token-error'

interface RevokeTokenUseCaseRequest {
  token: string
  expiresAt: number
}

export class RevokeTokenUseCase {
  constructor(private blacklistTokenRepository: BlacklistTokenRepository) {}

  async execute({
    token,
    expiresAt,
  }: RevokeTokenUseCaseRequest): Promise<void> {
    if (!token || !expiresAt) {
      throw new MissingTokenError()
    }

    const now = Math.floor(Date.now() / 1000)
    const ttl = expiresAt - now

    if (ttl <= 0) {
      // já expirou, então não precisa salvar
      return
    }

    await this.blacklistTokenRepository.blacklistToken(token, ttl)
  }
}
