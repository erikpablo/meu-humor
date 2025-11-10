import { MoodEntryRepository } from '@/repositories/mood-entry-repository'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(utc)
dayjs.extend(customParseFormat)

interface GetMoodsUseCaseRequest {
  userId: string
  startDate?: string
  endDate?: string
  order?: 'asc' | 'desc'
  limit?: number
}

interface GetMoodsUseCaseResponse {
  data: {
    id: string
    date: string
    weight: number
  }[]
  avg: number | null
}

export class GetMoodsUseCase {
  constructor(private moodsRepository: MoodEntryRepository) {}

  async execute({
    userId,
    startDate,
    endDate,
    order = 'asc',
    limit,
  }: GetMoodsUseCaseRequest): Promise<GetMoodsUseCaseResponse> {
    const DATE_FORMAT = 'DD/MM/YYYY'

    let start: dayjs.Dayjs
    let end: dayjs.Dayjs

    if (startDate && endDate) {
      start = dayjs(startDate, DATE_FORMAT).utc(true)
      end = dayjs(endDate, DATE_FORMAT).utc(true)
    } else {
      start = dayjs.utc()
      end = dayjs.utc()
    }

    const startOfDay = start.startOf('day').toDate()
    const endOfDay = end.endOf('day').toDate()

    const moods = await this.moodsRepository.findManyByDateRange({
      userId,
      startDate: startOfDay,
      endDate: endOfDay,
      order,
      limit,
    })

    const average = moods.length
      ? moods.reduce((acc, mood) => acc + mood.moodType.weight, 0) /
        moods.length
      : null

    return {
      data: moods.map((mood) => ({
        id: mood.id,
        date: dayjs(mood.createdAt).format('YYYY-MM-DD'),
        weight: mood.moodType.weight,
      })),
      avg: average,
    }
  }
}
