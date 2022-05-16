import { BadGatewayException, Controller, Get, HttpException, Redirect, Render, UseFilters } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { UsersService } from './user/user.service';

@Controller('/')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}


	@Redirect("auth/email")
  @Get('email')
  async toAuthEmail() {
		return
  }
}
