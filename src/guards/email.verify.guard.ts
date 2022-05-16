import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';
import { UnVerifyEmaailException } from '../exceptions/unverify.email.exception';



@Injectable()
export class VerifyEmailGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  canActivate(
    context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		if (this.authService.emailIsVerified()) {
			return true
		}
		throw new UnVerifyEmaailException();
  }
}
