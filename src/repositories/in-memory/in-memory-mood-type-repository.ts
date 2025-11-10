import { randomUUID } from 'node:crypto'

export interface MoodType {
  id: string
  name: string
  emoji: string
  weight: number
}

export class InMemoryMoodTypeRepository {
  public items: MoodType[] = []

  async create(data: Omit<MoodType, 'id'>): Promise<MoodType> {
    const moodType: MoodType = {
      id: randomUUID(),
      ...data,
    }

    this.items.push(moodType)

    return moodType
  }

  async findById(id: string): Promise<MoodType | null> {
    const mood = this.items.find((item) => item.id === id)
    return mood || null
  }

  async findAll(): Promise<MoodType[]> {
    return this.items
  }
}
