import { InMemoryUsersRepository } from 'src/repositories/in-memory/in-memory-users-repository'
import { describe, it, expect, beforeEach } from 'vitest'
import { compare, hash } from 'bcryptjs'
import { UpdateProfileUseCase } from './update-profile'
import { ResourceNotFoundError } from './error/resource-not-found-error'
import { OldPasswordDoesNotMatchError } from './error/old-password-does-not-match-error'
import { NewPasswordDoesNotMatchError } from './error/new-password-does-not-match-error'

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
      oldPassword: '12345678',
      newPassword: '123456789',
      confirmNewPassword: '123456789',
    })

    expect(user.name).toEqual('Erik Pablo')

    const isPasswordCorrect = await compare('123456789', user.password)
    expect(isPasswordCorrect).toBe(true)
  })

  it('should not be possible to update the profile if the old password is not correct', async () => {
    const createUser = await usersRepository.create({
      id: 'user_id',
      name: 'John Doe',
      email: 'jhon@gmail.com',
      password: await hash('12345678', 8),
    })

    await expect(() =>
      sut.execute({
        userId: createUser.id,
        name: 'Erik Pablo',
        oldPassword: '1234567',
        newPassword: '123456789',
        confirmNewPassword: '123456789',
      })
    ).rejects.toBeInstanceOf(OldPasswordDoesNotMatchError)
  })

  it('should not be possible to update the profile if the new password confirmation is not correct.', async () => {
    const createUser = await usersRepository.create({
      id: 'user_id',
      name: 'John Doe',
      email: 'jhon@gmail.com',
      password: await hash('12345678', 8),
    })

    await expect(() =>
      sut.execute({
        userId: createUser.id,
        name: 'Erik Pablo',
        oldPassword: '12345678',
        newPassword: '123456789',
        confirmNewPassword: '12345678',
      })
    ).rejects.toBeInstanceOf(NewPasswordDoesNotMatchError)
  })

  it('should not be able to update data if the user does not exist', async () => {
    await expect(() =>
      sut.execute({
        userId: 'user_id_not_exists',
        name: 'Erik Pablo',
        oldPassword: '12345678',
        newPassword: '123456789',
        confirmNewPassword: '123456789',
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
