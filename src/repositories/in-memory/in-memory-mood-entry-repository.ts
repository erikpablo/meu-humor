import { Prisma, MoodEntry } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import {
  MoodEntryRepository,
  MoodEntryWithType,
} from '../mood-entry-repository'
import dayjs from 'dayjs'
import type { InMemoryMoodTypeRepository } from './in-memory-mood-type-repository'

export class InMemoryMoodEntryRepository implements MoodEntryRepository {
  public items: MoodEntry[] = []

  constructor(private moodTypeRepository: InMemoryMoodTypeRepository) {}

  async findManyByDateRange(params: {
    userId: string
    startDate: Date
    endDate: Date
    order?: 'asc' | 'desc'
    limit?: number
  }): Promise<MoodEntryWithType[]> {
    let moods = this.items.filter(
      (item) =>
        item.userId === params.userId &&
        item.createdAt >= params.startDate &&
        item.createdAt <= params.endDate
    )

    moods = moods.sort((a, b) =>
      params.order === 'desc'
        ? b.createdAt.getTime() - a.createdAt.getTime()
        : a.createdAt.getTime() - b.createdAt.getTime()
    )

    if (params.limit) {
      moods = moods.slice(0, params.limit)
    }

    const moodsWithType: MoodEntryWithType[] = await Promise.all(
      moods.map(async (m) => {
        const moodType = (await this.moodTypeRepository.findById(
          m.moodTypeId
        )) ?? {
          id: m.moodTypeId,
          name: 'Simulated Mood',
          emoji: '🙂',
          weight: 1,
        }

        return {
          ...m,
          moodType,
        }
      })
    )

    return moodsWithType
  }

  async findByIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('day')
    const endOfTheDay = dayjs(date).endOf('day')

    const moodEntryOnSameDate = this.items.find((moodEntry) => {
      const moodInDate = dayjs(moodEntry.createdAt)
      const isOnSameDate =
        moodInDate.isAfter(startOfTheDay) && moodInDate.isBefore(endOfTheDay)

      return moodEntry.userId === userId && isOnSameDate
    })

    return moodEntryOnSameDate ?? null
  }

  async create(data: Prisma.MoodEntryUncheckedCreateInput) {
    const moodEntry: MoodEntry = {
      id: data.id ?? randomUUID(),
      note: data.note ?? null,
      createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
      moodTypeId: data.moodTypeId,
      userId: data.userId,
    }

    this.items.push(moodEntry)
    return moodEntry
  }
}
