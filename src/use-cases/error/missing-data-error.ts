import { AppException } from '@/shared/errors/app-exception'
import { ErrorsCode } from '@/shared/errors/errors-code'
import { HttpStatusCodes } from '@/shared/errors/http-status-codes'

export class MissingDataError extends AppException {
  constructor() {
    super(
      'Missing mandatory data',
      HttpStatusCodes.BAD_REQUEST,
      ErrorsCode.MISSING_MANDATORY_DATA
    )
  }
}
