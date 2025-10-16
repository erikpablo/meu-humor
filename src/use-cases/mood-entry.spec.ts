import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryMoodTypeRepository } from '@/repositories/in-memory/in-memory-mood-type-repository'
import { MoodEntryUseCase } from './mood-entry'
import { MaxNumberOfMoodTypeError } from './error/max-number-of-mood-type-error'

let MoodEntryRepository: InMemoryMoodTypeRepository
let sut: MoodEntryUseCase

describe('Mood type Use Case', () => {
  beforeEach(() => {
    MoodEntryRepository = new InMemoryMoodTypeRepository()
    sut = new MoodEntryUseCase(MoodEntryRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to mood type', async () => {
    const { moodEntry } = await sut.execute({
      userId: 'user-id',
      moodTypeId: 'mood-entry-id',
    })

    expect(moodEntry.id).toEqual(expect.any(String))
    expect(moodEntry.userId).toEqual('user-id')
  })

  it('should not be able to choose the mood twice in the same day', async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0))

    await sut.execute({
      userId: 'user-id',
      moodTypeId: 'mood-entry-id',
    })

    await expect(() =>
      sut.execute({
        userId: 'user-id',
        moodTypeId: 'mood-entry-id',
      })
    ).rejects.toBeInstanceOf(MaxNumberOfMoodTypeError)
  })

  it('should be able to mood type in twice but different days', async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0))

    await sut.execute({
      userId: 'user-id',
      moodTypeId: 'mood-entry-id',
    })

    vi.setSystemTime(new Date(2023, 0, 21, 8, 0, 0))

    const { moodEntry } = await sut.execute({
      userId: 'user-id',
      moodTypeId: 'mood-entry-id',
    })

    expect(moodEntry.id).toEqual(expect.any(String))
  })
})
