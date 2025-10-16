import { Prisma, MoodEntry } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { MoodEntryRepository } from '../mood-entry-repository'
import dayjs from 'dayjs'

export class InMemoryMoodTypeRepository implements MoodEntryRepository {
  public items: MoodEntry[] = []

  async findByIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const moodEntryInOnSameDate = this.items.find((moodEntry) => {
      const MoodInDate = dayjs(moodEntry.createdAt)
      const InOnSameDate =
        MoodInDate.isAfter(startOfTheDay) && MoodInDate.isBefore(endOfTheDay)

      return moodEntry.userId === userId && InOnSameDate
    })

    if (!moodEntryInOnSameDate) {
      return null
    }

    return moodEntryInOnSameDate
  }

  async create(data: Prisma.MoodEntryUncheckedCreateInput) {
    const moodEntry: MoodEntry = {
      id: data.id ?? randomUUID(),
      note: data.note ?? null,
      createdAt: new Date(),
      moodTypeId: data.moodTypeId,
      userId: data.userId,
    }

    this.items.push(moodEntry)

    return moodEntry
  }
}
