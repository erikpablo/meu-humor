import { AppException } from '@/shared/errors/app-exception'
import { ErrorsCode } from '@/shared/errors/errors-code'
import { HttpStatusCodes } from '@/shared/errors/http-status-codes'

export class AvatarNotSetError extends AppException {
  constructor() {
    super(
      'Avatar not set',
      HttpStatusCodes.BAD_REQUEST,
      ErrorsCode.AVATAR_NO_SET
    )
  }
}
