import type { MoodEntry, Prisma } from '@prisma/client'

export interface MoodTypeRepository {
  create(data: Prisma.MoodEntryUncheckedCreateInput): Promise<MoodEntry>
  findByIdOnDate(userId: string, date: Date): Promise<MoodEntry | null>
}
