import { AppException } from '@/shared/errors/app-exception'
import { ErrorsCode } from '@/shared/errors/errors-code'
import { HttpStatusCodes } from '@/shared/errors/http-status-codes'

export class NewPasswordDoesNotMatchError extends AppException {
  constructor() {
    super(
      'New password does not match',
      HttpStatusCodes.CONFLICT,
      ErrorsCode.NEW_PASSWORD_DOES_NOT_MATCH
    )
  }
}
