import { ErrorsCode } from './errors-code'
import { HttpStatusCodes } from './http-status-codes'

export class AppException {
  public readonly message: string
  public readonly statusCode: number
  public readonly errorsCode: ErrorsCode

  constructor(
    message: string,
    statusCode = HttpStatusCodes.BAD_REQUEST,
    errorsCode = ErrorsCode.INTERNAL_SERVER_ERROR
  ) {
    this.message = message
    this.statusCode = statusCode
    this.errorsCode = errorsCode
  }
}
