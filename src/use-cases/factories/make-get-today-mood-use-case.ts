import { PrismaMoodEntryRepository } from '@/repositories/prisma/prisma-mood-entry-repository'
import { GetTodayMoodUseCase } from '../get-today-mood'

export function makeGetTodayMoodUseCase() {
  const prismaMoodTypeRepository = new PrismaMoodEntryRepository()
  const moodTodayUseCase = new GetTodayMoodUseCase(prismaMoodTypeRepository)

  return moodTodayUseCase
}
