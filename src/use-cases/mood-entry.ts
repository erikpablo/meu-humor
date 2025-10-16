import type { MoodEntry } from '@prisma/client'
import { MissingDataError } from './error/missing-data-error'
import type { MoodEntryRepository } from '@/repositories/mood-entry-repository'
import { MaxNumberOfMoodTypeError } from './error/max-number-of-mood-type-error'

interface MoodEntryUseCaseRequest {
  userId: string
  moodTypeId: string
  note?: string
}

interface MoodEntryUseCaseResponse {
  moodEntry: MoodEntry
}

export class MoodEntryUseCase {
  constructor(private moodEntryRepository: MoodEntryRepository) {}
  async execute({
    userId,
    moodTypeId,
    note,
  }: MoodEntryUseCaseRequest): Promise<MoodEntryUseCaseResponse> {
    if (!userId || !moodTypeId) {
      throw new MissingDataError()
    }

    const moodEntryOnSameDay = await this.moodEntryRepository.findByIdOnDate(
      userId,
      new Date()
    )

    if (moodEntryOnSameDay) {
      throw new MaxNumberOfMoodTypeError()
    }

    const moodEntry = await this.moodEntryRepository.create({
      userId,
      moodTypeId,
      note,
    })

    return { moodEntry }
  }
}
