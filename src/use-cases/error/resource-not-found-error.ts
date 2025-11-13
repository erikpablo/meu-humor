import { AppException } from '@/shared/errors/app-exception'
import { ErrorsCode } from '@/shared/errors/errors-code'
import { HttpStatusCodes } from '@/shared/errors/http-status-codes'

export class ResourceNotFoundError extends AppException {
  constructor() {
    super(
      'Resource Not Found',
      HttpStatusCodes.NOT_FOUND,
      ErrorsCode.RESOURCE_NOT_FOUND_ERROR
    )
  }
}
