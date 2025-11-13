import type { MoodEntry, MoodType, Prisma } from '@prisma/client'

export type MoodEntryWithType = MoodEntry & {
  moodType: {
    id: string
    name: string
    emoji: string
    weight: number
  }
}

export interface MoodEntryRepository {
  create(data: Prisma.MoodEntryUncheckedCreateInput): Promise<MoodEntry>
  findByIdOnDate(userId: string, date: Date): Promise<MoodEntry | null>
  findManyByDateRange(params: {
    userId: string
    startDate: Date
    endDate: Date
    order?: 'asc' | 'desc'
    limit?: number
  }): Promise<MoodEntryWithType[]>
  findByUserIdAndDate(userId: string, date: Date): Promise<MoodType | null>
}
