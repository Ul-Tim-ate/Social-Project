import { Controller, Get, Render, UseInterceptors } from '@nestjs/common';
import { SearchInterceptor } from 'src/search/search.interceptor';

@Controller('search')
export class SearchController {

  @UseInterceptors(SearchInterceptor)
  @Render('search')
  @Get()
  getMainpage() {}
}
