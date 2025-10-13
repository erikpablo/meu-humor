import type { Prisma, User } from '@prisma/client'
import { prisma } from 'src/lib/prisma'
import { UsersRepository } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }

  async update(userId: string, name: string, password: string) {
    return await prisma.user.update({
      where: { id: userId },
      data: { name, password },
    })
  }

  async save(userId: string, avatarUrl: string) {
    return await prisma.user.update({
      where: { id: userId },
      data: { avatarUrl: avatarUrl },
    })
  }

  async findById(userId: string) {
    return prisma.user.findUnique({
      where: { id: userId },
    })
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }
}
