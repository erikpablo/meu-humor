import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryMoodTypeRepository } from '@/repositories/in-memory/in-memory-mood-type-repository'
import { InMemoryMoodEntryRepository } from '@/repositories/in-memory/in-memory-mood-entry-repository'
import { GetMoodsUseCase } from './get-moods'
import dayjs from 'dayjs'

let moodEntryRepository: InMemoryMoodEntryRepository
let moodTypeRepository: InMemoryMoodTypeRepository
let sut: GetMoodsUseCase

describe('Get Moods Use Case', () => {
  beforeEach(() => {
    moodTypeRepository = new InMemoryMoodTypeRepository()
    moodEntryRepository = new InMemoryMoodEntryRepository(moodTypeRepository)
    sut = new GetMoodsUseCase(moodEntryRepository)
  })

  it('should return moods within date range and calculate correct average', async () => {
    const today = dayjs('2023-01-20').toDate()
    const tomorrow = dayjs('2023-01-21').toDate()

    const happy = await moodTypeRepository.create({
      emoji: '😄',
      name: 'Happy',
      weight: 5,
    })

    const sad = await moodTypeRepository.create({
      emoji: '🙁',
      name: 'Sad',
      weight: 2,
    })

    await moodEntryRepository.create({
      userId: 'user-1',
      moodTypeId: happy.id,
      createdAt: today,
    })

    await moodEntryRepository.create({
      userId: 'user-1',
      moodTypeId: sad.id,
      createdAt: tomorrow,
    })

    const { data, avg } = await sut.execute({
      userId: 'user-1',
      startDate: '20/01/2023',
      endDate: '21/01/2023',
    })

    expect(data).toHaveLength(2)
    expect(avg).toBe(3.5)
  })
})
