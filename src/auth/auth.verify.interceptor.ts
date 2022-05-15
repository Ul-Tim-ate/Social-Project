import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { UsersService } from "src/user/user.service";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthVerifyInterceptor implements NestInterceptor {
  constructor(
    private readonly authService: AuthService,
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		
    return next.handle();
  }
}
