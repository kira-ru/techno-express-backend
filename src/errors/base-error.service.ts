import {HttpStatus} from '@/types/http-statuses.ts'

export class BaseErrorService extends Error {
  public status: HttpStatus;

  constructor(status, message) {
    super();
    this.status = status
    this.message = message
  }

  static badRequest(message): Error {
    return new BaseErrorService(HttpStatus.CODE400, message)
  }

  static internal(message): Error {
    return new BaseErrorService(HttpStatus.CODE500, message)
  }

  static forbidden(message): Error {
    return new BaseErrorService(HttpStatus.CODE403, message)
  }
}
