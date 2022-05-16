import {
	ArgumentsHost,
  BadGatewayException,
  CallHandler,
  Catch,
  ExceptionFilter,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request, Response } from 'express';
import { UsersService } from '../user/user.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class SearchInterceptor implements NestInterceptor {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    try {
      const user = this.authService.getCurrentUser();
      this.userService.incCountOfOpens(user.uid);
    } catch (error) {
      console.log('ошибка');
		}
    return next.handle();
  }
}

@Catch(BadGatewayException)
export class BadGatewayExceptionFilter implements ExceptionFilter {
  catch(exception: BadGatewayException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    return response.redirect(`${process.env.AUTH_PAGE}`);

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}