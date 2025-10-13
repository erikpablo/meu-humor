import { InMemoryUsersRepository } from 'src/repositories/in-memory/in-memory-users-repository'
import { describe, it, expect, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourceNotFoundError } from './error/resource-not-found-error'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get user profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })

  it('should be able to get user profile', async () => {
    const createUser = await usersRepository.create({
      id: 'user_id',
      name: 'John Doe',
      email: 'jhon@gmail.com',
      password: await hash('12345678', 8),
    })

    const { user } = await sut.execute({
      userId: createUser.id,
    })

    expect(user.name).toEqual('John Doe')
  })

  it('should be able to get user profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        userId: 'non-existing-id',
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
