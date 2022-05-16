import { Controller, Get, Render, UseGuards, UseInterceptors } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { SearchInterceptor } from 'src/search/search.interceptor';
import { UsersService } from 'src/user/user.service';

@Controller('/')
export class SearchController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(AuthGuard)
  @UseInterceptors(SearchInterceptor)
  @Get('newtab')
  @Render('newtab')
  async getNewTabPage() {
    const { countOfOpens } = await this.userService.getUserByUID(
      await this.authService.getCurrentUser().uid,
    );
    const allCollected = await this.userService.getAllCollected();
    return { allCollected, countOfOpens };
  }
}
