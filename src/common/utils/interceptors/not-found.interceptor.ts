import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  NotFoundException,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 * Allows for easy 404 from controller methods when null is returned as part
 * of a data lookup.
 */
@Injectable()
export class NotFoundInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    stream$: CallHandler,
  ): Observable<unknown> {
    return stream$.handle().pipe(
      tap((data) => {
        if (!data) {
          throw new NotFoundException();
        }
      }),
    );
  }
}
