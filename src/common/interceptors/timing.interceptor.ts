import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class TimingInterceptor implements NestInterceptor {
  private readonly logger = new Logger("Intercept-Handler");
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const startTime = Date.now();
    return next.handle().pipe(tap(() => this.logger.log(`Execution time: ${Date.now() - startTime}ms`)));
  }
}