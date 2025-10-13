import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'
import { randomUUID } from 'node:crypto'
import { ResourceNotFoundError } from '@/use-cases/error/resource-not-found-error'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async update(userId: string, name: string, password: string) {
    const userIndex = this.items.findIndex((item) => item.id === userId)
    if (userIndex === -1) {
      throw new ResourceNotFoundError()
    }

    const updatedProfile: User = {
      ...this.items[userIndex],
      name,
      password,
    }

    this.items[userIndex] = updatedProfile
    return updatedProfile
  }

  async save(userId: string, avatarUrl: string) {
    const userIndex = this.items.findIndex((item) => item.id === userId)

    if (userIndex === -1) {
      throw new ResourceNotFoundError()
    }

    const updateUser = {
      ...this.items[userIndex],
      avatarUrl,
    }

    this.items[userIndex] = updateUser

    return updateUser
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
