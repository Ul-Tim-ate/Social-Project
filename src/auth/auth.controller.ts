import { Body, Controller, Get, HttpCode, Post, Render, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUser } from './model/auth.user';
import { Response } from 'express';

@Controller()
export class AuthController {
	constructor(private readonly authService: AuthService) { }

  @Post('register')
  async register(@Body() dto: AuthUser) {
		return dto; //this.authService.register(dto, response);
  }
	@HttpCode(200)
	@Post('login')
  async login(@Body() user: AuthUser) {
		return this.authService.createUserByEmail(user);
	}
	@Get('/login.html')
  @Render('login')
  getLoginPage() {
    return {};
  }

  @Get('/register.html')
  @Render('register')
  getRegisterPage() {
    return {};
  }
}







//createUserByGoogle
	// @Get('/google')
  // async createUserByGoogle() {
	// 	return this.authService.createUserByGoogle();
	// }