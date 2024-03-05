import {HttpStatus} from '@/types/http-statuses.ts';

export class BaseErrorService extends Error {
  public status: HttpStatus;

  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
    Object.setPrototypeOf(this, BaseErrorService.prototype);
  }

  static badRequest(message: string): Error {
    return new BaseErrorService(HttpStatus.CODE400, message);
  }

  static internal(message: string): Error {
    return new BaseErrorService(HttpStatus.CODE500, message);
  }

  static forbidden(message: string): Error {
    return new BaseErrorService(HttpStatus.CODE403, message);
  }

  static unauthorized(message?: string): Error {
    return new BaseErrorService(HttpStatus.CODE401, message ?? 'Не авторизованный пользователь');
  }
}
