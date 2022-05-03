import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUser } from './model/auth.user';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}
  @Post('/signup')
  async createUser(@Body() user: AuthUser) {
		return this.authService.createUserByEmail(user);
	}
	
	@HttpCode(200)
	@Post('/login')
  async login(@Body() user: AuthUser) {
		return this.authService.createUserByEmail(user);
	}
}
