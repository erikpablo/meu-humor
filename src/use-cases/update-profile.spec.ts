import { InMemoryUsersRepository } from 'src/repositories/in-memory/in-memory-users-repository'
import { describe, it, expect, beforeEach } from 'vitest'
import { compare, hash } from 'bcryptjs'
import { GetUserProfileUseCase } from './get-user-profile'
import { UpdateProfileUseCase } from './update-profile'
import { ResourceNotFoundError } from './error/resource-not-found-error'

let usersRepository: InMemoryUsersRepository
let sut: UpdateProfileUseCase

describe('Ge user profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new UpdateProfileUseCase(usersRepository)
  })

  it('should be able to update profile', async () => {
    const createUser = await usersRepository.create({
      id: 'user_id',
      name: 'John Doe',
      email: 'jhon@gmail.com',
      password: await hash('12345678', 8),
    })

    const { user } = await sut.execute({
      userId: createUser.id,
      name: 'Erik Pablo',
      password: '123456789',
    })

    expect(user.name).toEqual('Erik Pablo')

    const isPasswordCorrect = await compare('123456789', user.password)
    expect(isPasswordCorrect).toBe(true)
  })

  it('should not be able to update data if the id does not exist', async () => {
    await expect(() =>
      sut.execute({
        userId: 'user_id_not_exists',
        name: 'Erik Pablo',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
