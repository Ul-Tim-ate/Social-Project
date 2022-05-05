import { Body, Controller, Get, HttpCode, Post, Redirect, Render, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUser } from './model/auth.user';
import { Response } from 'express';

@Controller()
export class AuthController {
	constructor(private readonly authService: AuthService) { }

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
	@Redirect('/login.html')
  @Post('register')
  async register(@Body() dto: AuthUser) {
		return this.authService.createUserByEmail(dto);
	}

	@Redirect()
	@HttpCode(200)
	@Post('login')
	async login(@Body() user: AuthUser) {
		const userUID = await this.authService.login(user)
		return { url: `http://localhost:4000/user/${userUID}`}

	}
}







//createUserByGoogle
	// @Get('/google')
  // async createUserByGoogle() {
	// 	return this.authService.createUserByGoogle();
	// }