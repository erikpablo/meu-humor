import { InMemoryUsersRepository } from 'src/repositories/in-memory/in-memory-users-repository'
import { describe, it, expect, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { UserAlreadyExistsError } from './error/user-already-exists-error'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'jhon@gmail.com',
      password: '12345678',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'erik',
      email: 'erik12@gmail.com',
      password: '12345678',
    })

    const isPasswordCorrectlyHashed = await compare('12345678', user.password)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should hash user password upon registration', async () => {
    const email = 'erik12@gmail.com'

    await sut.execute({
      name: 'erik',
      email,
      password: '12345678',
    })

    await expect(() =>
      sut.execute({
        name: 'Erik valdivino',
        email,
        password: '123456',
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
