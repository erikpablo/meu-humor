import { MoodEntryRepository } from '@/repositories/mood-entry-repository'
import type { MoodType } from '@prisma/client'

interface GetTodayMoodUseCaseRequest {
  userId: string
}

interface GetTodayMoodUseCaseResponse {
  mood: MoodType | null
}

export class GetTodayMoodUseCase {
  constructor(private moodTypeRepository: MoodEntryRepository) {}

  async execute({
    userId,
  }: GetTodayMoodUseCaseRequest): Promise<GetTodayMoodUseCaseResponse> {
    const date = new Date()

    const mood = await this.moodTypeRepository.findByUserIdAndDate(userId, date)

    return {
      mood,
    }
  }
}
