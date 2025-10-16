import { PrismaMoodTypeRepository } from '@/repositories/prisma/prisma-mood-type-repository'
import { MoodTypeUseCase } from '../mood-type'

export function makeMoodTypeUseCase() {
  const prismaMoodTypeRepository = new PrismaMoodTypeRepository()
  const moodTypeUseCase = new MoodTypeUseCase(prismaMoodTypeRepository)

  return moodTypeUseCase
}
