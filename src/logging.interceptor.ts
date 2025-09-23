import { Injectable , NestInterceptor , ExecutionContext , CallHandler} from '@nestjs/common'
import {Observable} from 'rxjs'
import {tap} from 'rxjs/operators'


@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse()
        const { method , url} = request
        const startime = Date.now()
        return next.handle().pipe(
            tap(()=> {
                const duration = Date.now() - startime
                 console.log(`🟣 [${new Date().toISOString()}] ${method} ${url} - ${response.statusCode} - ${duration}ms`);
            })
        )
    }
}