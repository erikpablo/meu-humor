import { prisma } from '@/lib/prisma'
import type { Prisma } from '@prisma/client'
import dayjs from 'dayjs'
import type { MoodEntryRepository } from '../mood-entry-repository'

export class PrismaMoodEntryRepository implements MoodEntryRepository {
  async findByIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('day')
    const endOfTheDay = dayjs(date).endOf('day')

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
