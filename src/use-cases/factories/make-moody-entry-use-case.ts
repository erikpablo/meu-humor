import { PrismaMoodEntryRepository } from '@/repositories/prisma/prisma-mood-entry-repository'
import { MoodEntryUseCase } from '../mood-entry'

export function makeMoodTypeUseCase() {
  const prismaMoodTypeRepository = new PrismaMoodEntryRepository()
  const moodTypeUseCase = new MoodEntryUseCase(prismaMoodTypeRepository)

  return moodTypeUseCase
}
