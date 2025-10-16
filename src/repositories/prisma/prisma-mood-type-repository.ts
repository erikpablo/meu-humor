import { prisma } from '@/lib/prisma'
import type { MoodEntry, Prisma } from '@prisma/client'
import type { MoodTypeRepository } from '../mood-type-repository'
import dayjs from 'dayjs'

export class PrismaMoodTypeRepository implements MoodTypeRepository {
  async findByIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const moodType = await prisma.moodEntry.findFirst({
      where: {
        userId,
        createdAt: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
    })

    return moodType
  }

  async create(data: Prisma.MoodEntryUncheckedCreateInput) {
    const moodType = await prisma.moodEntry.create({
      data,
    })

    return moodType
  }
}
