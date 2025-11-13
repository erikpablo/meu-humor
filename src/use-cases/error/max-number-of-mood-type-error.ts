import { AppException } from '@/shared/errors/app-exception'
import { ErrorsCode } from '@/shared/errors/errors-code'
import { HttpStatusCodes } from '@/shared/errors/http-status-codes'

export class MaxNumberOfMoodTypeError extends AppException {
  constructor() {
    super(
      'Max number of mood type reached.',
      HttpStatusCodes.TOO_MANY_REQUESTS,
      ErrorsCode.MAX_NUMBER_OF_MOOD_TYPE_REACHED
    )
  }
}
