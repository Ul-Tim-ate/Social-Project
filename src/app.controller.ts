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

  @Get('newtab')
  @Render('newtab')
  async getNewTabPage() {
    const { countOfOpens } = await this.userService.getUserByUID(
      await this.authService.getCurrentUser().uid,
    );
    const allCollected = await this.userService.getAllCollected();
    return { allCollected, countOfOpens };
  }

	@Redirect("auth/email")
  @Get('email')
  async toAuthEmail() {
		return
  }
}
