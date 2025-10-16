import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from 'src/repositories/in-memory/in-memory-users-repository'
import { UpdateUserAvatarUseCase } from './update-user-avatar'
import { AvatarNotSetError } from './error/avatar-not-set-error'

let usersRepository: InMemoryUsersRepository
let sut: UpdateUserAvatarUseCase

describe('Update User Avatar Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new UpdateUserAvatarUseCase(usersRepository)
  })

  it('should be able to update user avatar', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
    })

    const { avatarUrl } = await sut.execute({
      userId: user.id,
      avatarUrl: 'https://example.com/avatar.jpg',
    })

    expect(avatarUrl).toEqual('https://example.com/avatar.jpg')
  })

  it('should not be able to update user avatar without providing an avatar file', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        userId: user.id,
        avatarUrl: '',
      })
    ).rejects.toBeInstanceOf(Error) // ou seu erro customizado, ex: MissingAvatarError
  })
})
