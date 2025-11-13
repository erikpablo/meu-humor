import { AppException } from '@/shared/errors/app-exception'
import { ErrorsCode } from '@/shared/errors/errors-code'
import { HttpStatusCodes } from '@/shared/errors/http-status-codes'

export class UserWithEmailAlreadyExistsError extends AppException {
  constructor() {
    super(
      'User with this email already exists',
      HttpStatusCodes.CONFLICT,
      ErrorsCode.SAME_EMAIL_ALREADY_EXISTS
    )
  }
}
