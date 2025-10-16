import { InMemoryUsersRepository } from 'src/repositories/in-memory/in-memory-users-repository'
import { describe, it, expect, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './error/invalid-credentials-error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to register', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'jhon@gmail.com',
      password: await hash('12345678', 8),
    })

    const { user } = await sut.execute({
      email: 'jhon@gmail.com',
      password: '12345678',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'jhon@gmail.com',
        password: '12345678',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'jhon@gmail.com',
      password: await hash('12345678', 8),
    })
    await expect(() =>
      sut.execute({
        email: 'jhon@gmail.com',
        password: '12345690',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
