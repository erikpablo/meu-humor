import { prisma } from '@/lib/prisma'
import { Prisma, type MoodType } from '@prisma/client'
import dayjs from 'dayjs'
import {
  MoodEntryRepository,
  MoodEntryWithType,
} from '../mood-entry-repository'

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

  async findManyByDateRange(params: {
    userId: string
    startDate: Date
    endDate: Date
    order?: 'asc' | 'desc'
    limit?: number
  }): Promise<MoodEntryWithType[]> {
    const { userId, startDate, endDate, order = 'asc', limit } = params

    return prisma.moodEntry.findMany({
      where: {
        userId,
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: { createdAt: order },
      take: limit,
      include: { moodType: true },
    })
  }

  async findByUserIdAndDate(
    userId: string,
    date: Date
  ): Promise<MoodType | null> {
    const startOfDay = dayjs(date).startOf('day')
    const endOfDay = dayjs(date).endOf('day')

    const mood = await prisma.moodEntry.findFirst({
      where: {
        userId,
        createdAt: {
          gte: startOfDay.toDate(),
          lte: endOfDay.toDate(),
        },
      },
      include: {
        moodType: true,
      },
    })

    if (!mood) {
      return null
    }

    return mood.moodType
  }
}
