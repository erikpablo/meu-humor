import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  save(userId: string, avatarUrl: string): Promise<User> {
    throw new Error('Method not implemented.')
  }

  async findById(id: string) {
    const user = this.items.find((item) => item.id == id)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user: User = {
      id: data.id ?? randomUUID(),
      name: data.name,
      email: data.email,
      password: data.password,
      avatarUrl: data.avatarUrl ?? null,
      createdAt: new Date(),
    }

    this.items.push(user)

    return user
  }
}
