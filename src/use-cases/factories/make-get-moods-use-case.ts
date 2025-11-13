import { PrismaMoodEntryRepository } from '@/repositories/prisma/prisma-mood-entry-repository'
import { GetMoodsUseCase } from '../get-moods-average'

export function MakeGetMoodsUseCase() {
  const prismaMoodTypeRepository = new PrismaMoodEntryRepository()
  const moodTypeUseCase = new GetMoodsUseCase(prismaMoodTypeRepository)

  return moodTypeUseCase
}
