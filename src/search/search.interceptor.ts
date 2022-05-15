import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
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
      const user = this.authService.checkAuth();
      this.userService.incCountOfOpens(user.uid);
    } catch (error) {
      console.log('ошибка');
    }
    return next.handle();
  }
}
