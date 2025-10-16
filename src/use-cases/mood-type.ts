import type { MoodEntry } from '@prisma/client'
import { MissingDataError } from './error/missing-data-error'
import type { MoodTypeRepository } from '@/repositories/mood-type-repository'
import { MaxNumberOfMoodTypeError } from './error/max-number-of-mood-type-error'

interface MoodTypeUseCaseRequest {
  userId: string
  moodTypeId: string
  note?: string
}

interface MoodTypeUseCaseResponse {
  moodEntry: MoodEntry
}

export class MoodTypeUseCase {
  constructor(private moodTypeRepository: MoodTypeRepository) {}
  async execute({
    userId,
    moodTypeId,
    note,
  }: MoodTypeUseCaseRequest): Promise<MoodTypeUseCaseResponse> {
    if (!userId || !moodTypeId) {
      throw new MissingDataError()
    }

    const moodTypeOnSameDay = await this.moodTypeRepository.findByIdOnDate(
      userId,
      new Date()
    )

    if (moodTypeOnSameDay) {
      throw new MaxNumberOfMoodTypeError()
    }

    const moodEntry = await this.moodTypeRepository.create({
      userId,
      moodTypeId,
      note,
    })

    return { moodEntry }
  }
}
