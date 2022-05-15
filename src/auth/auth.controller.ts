import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Redirect,
  Render,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUser } from './model/auth.user';
import * as dotenv from 'dotenv';
dotenv.config();

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('')
  @Render('auth')
  getAuthPage() {
    return {};
  }

  @Render('email')
  @Get('/email')
  getAuthEmailPage() {
    return {};
  }

  @HttpCode(200)
  @Redirect()
  @Post('/check')
  async userIsExist(@Body() dto: AuthUser) {
    if (await this.authService.userIsExist(dto.email)) {
      return { url: `${process.env.HOST}auth/sign-in` };
    }
    return { url: `${process.env.HOST}auth/create-user` };
  }

  @Render('sign-in')
  @Get('/sign-in')
  getSignInPage() {
    return {};
  }

  @Render('create-user')
  @Get('/create-user')
  getCreateUserPage() {
    return {};
  }

  @Redirect()
  @HttpCode(200)
  @Post('/login')
  async login(@Body() user: AuthUser) {
    const userUID = await this.authService.login(user);
    return { url: `${process.env.HOST}newtab` };
  }

  @HttpCode(200)
  @Redirect()
  @Post('/register')
  async register(@Body() dto: AuthUser) {
    console.log(dto);
    this.authService.createUserByEmail(dto);
    return { url: `${process.env.HOST}auth/sign-in` };
  }
}
