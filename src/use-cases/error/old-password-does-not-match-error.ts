import { AppException } from '@/shared/errors/app-exception'
import { ErrorsCode } from '@/shared/errors/errors-code'
import { HttpStatusCodes } from '@/shared/errors/http-status-codes'

export class OldPasswordDoesNotMatchError extends AppException {
  constructor() {
    super(
      'Old password does not match',
      HttpStatusCodes.CONFLICT,
      ErrorsCode.OLD_PASSWORD_DOES_NOT_MATCH
    )
  }
}
