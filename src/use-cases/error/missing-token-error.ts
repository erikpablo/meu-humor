import { AppException } from '@/shared/errors/app-exception'
import { ErrorsCode } from '@/shared/errors/errors-code'
import { HttpStatusCodes } from '@/shared/errors/http-status-codes'

export class MissingTokenError extends AppException {
  constructor() {
    super(
      'Missing token or expiration time',
      HttpStatusCodes.CONFLICT,
      ErrorsCode.MISSING_TOKEN_OR_EXPIRATION_TIME
    )
  }
}
