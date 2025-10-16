import type { MoodEntry, Prisma } from '@prisma/client'

export interface MoodEntryRepository {
  create(data: Prisma.MoodEntryUncheckedCreateInput): Promise<MoodEntry>
  findByIdOnDate(userId: string, date: Date): Promise<MoodEntry | null>
}
