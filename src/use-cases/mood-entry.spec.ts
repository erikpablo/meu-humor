import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryMoodEntryRepository } from '@/repositories/in-memory/in-memory-mood-entry-repository'
import { InMemoryMoodTypeRepository } from '@/repositories/in-memory/in-memory-mood-type-repository'
import { MoodEntryUseCase } from './mood-entry'
import { MaxNumberOfMoodTypeError } from './error/max-number-of-mood-type-error'

let moodEntryRepository: InMemoryMoodEntryRepository
let moodTypeRepository: InMemoryMoodTypeRepository
let sut: MoodEntryUseCase

describe('Mood Entry Use Case', () => {
  beforeEach(() => {
    moodTypeRepository = new InMemoryMoodTypeRepository()
    moodEntryRepository = new InMemoryMoodEntryRepository(moodTypeRepository)
    sut = new MoodEntryUseCase(moodEntryRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to create a mood entry', async () => {
    const { moodEntry } = await sut.execute({
      userId: 'user-id',
      moodTypeId: 'mood-entry-id',
    })

    expect(moodEntry.id).toEqual(expect.any(String))
    expect(moodEntry.userId).toEqual('user-id')
  })

  it('should not be able to choose the same mood twice in the same day', async () => {
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

  it('should be able to choose mood twice but on different days', async () => {
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
