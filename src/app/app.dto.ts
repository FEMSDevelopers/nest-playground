export class SuccessDto {
  success: boolean;

  constructor(success: boolean) {
    this.success = success;
  }
}

export const SUCCESS_TRUE = new SuccessDto(true);
export const SUCCESS_FALSE = new SuccessDto(false);

export class Status {
  healthy: boolean;
  message: string;
}

export class ExceptionResponse {
  requestData: unknown;
  statusCode: number;
  message: unknown;
  path: string;
  error?: string;
  stack: string;
}

export class AllExceptionsResponse {
  error: ExceptionResponse;
}
