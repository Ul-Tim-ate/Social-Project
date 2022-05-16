import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Render,
	UseFilters,
	UseGuards,
} from '@nestjs/common';
import { AuthUser } from 'src/auth/model/auth.user';
import { UnVerifyEmailFilter } from 'src/filters/unverify.email.exception.filters';
import { VerifyEmailGuard } from 'src/guards/email.verify.guard';
import { UserCreateDto } from './dto/user.create.dto';
import { UsersService } from './user.service';

@UseGuards(VerifyEmailGuard)
@UseFilters(UnVerifyEmailFilter)
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UsersService) {}
  // @Post()
  // async createUser(@Body() user: UserCreateDto) {
  // 	return this.userService.createUser(user);
  // }

  @Render('user')
  @Get('/:userUID')
  async getUserByUID(@Param('userUID') userUID: string) {
    return this.userService.getUserByUID(userUID);
  }

  // @Delete('/:userUID')
  // async deleteUserByEmail(@Param('userUID') userUID: string) {
  //   return this.userService.deleteAuthorByEmail(userUID);
  // }

  // @Get('')
  // async getAllUsers() {
  //   return this.userService.getAllUsers();
  // }
}
