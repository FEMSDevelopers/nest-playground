import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  RequestTimeoutException,
} from '@nestjs/common';
import { Observable, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  constructor(private readonly interval: number) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    if (this.interval > 0) {
      return next.handle().pipe(
        timeout(this.interval),
        catchError((error) => {
          if (error instanceof TimeoutError) {
            throw new RequestTimeoutException();
          }
          throw error;
        }),
      );
    }
    return next.handle();
  }
}
