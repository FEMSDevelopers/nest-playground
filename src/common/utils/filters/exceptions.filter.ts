import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

/**
 * This filter ensures that all uncaught errors return a consistent response.
 * The response should always contain an `error` value at the root, containing a `statusCode`,
 * `error` (the actual error), and `path` value.
 */

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const requestData = {
      body: request?.body,
      params: request?.params,
      query: request?.query,
      route: request?.route,
    };

    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? (exception.getResponse() as object)
        : {
            error: exception.name,
            message: exception.message
              ? exception.message
              : 'Internal server error',
          };

    const error = {
      error: {
        requestData,
        statusCode,
        ...message,
        path: request?.url,
        stack: exception.stack,
      },
    };

    this.logger.error(error);

    response.status?.(statusCode).json?.(error);
  }
}
