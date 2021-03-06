import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Redirect,
  Render,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUser } from './model/auth.user';
import * as dotenv from 'dotenv';
import { AuthGuard } from 'src/guards/auth.guard';

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

  @Get('/google')
  getGoogle() {
    return this.authService.SignInWithGoogle();
  }

  @Redirect('email')
  @Get('/auth/email')
  toAuthEmail() {
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

  @Render('verify-email')
  @Get('/verify-email')
  getVerifyPage() {
    return {};
  }

  @Redirect(`${process.env.SIGN_IN}`)
  @Get('/send-email')
  sendVerifyEmail() {
    return this.authService.verifyEmail();
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
    return { url: `${process.env.HOST}user/${userUID}` };
  }

  @HttpCode(200)
  @Redirect()
  @Post('/register')
  async register(@Body() dto: AuthUser) {
    this.authService.createUserByEmail(dto);
    return { url: `${process.env.SIGN_IN}` };
  }

  @Get('sign-out')
  @UseGuards(AuthGuard)
  @Redirect()
  signOut() {
    this.authService.signOut();
    return { url: `${process.env.AUTH_PAGE}` };
  }
  @UseGuards(AuthGuard)
  @Redirect()
  @Get('delete')
  deleteUser() {
    this.authService.deleteUser();
    return { url: `${process.env.AUTH_PAGE}` };
  }
}
