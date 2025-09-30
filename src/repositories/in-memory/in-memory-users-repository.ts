import type { Prisma, User } from '@prisma/client'
import type { UsersRepository } from '../users-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

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
