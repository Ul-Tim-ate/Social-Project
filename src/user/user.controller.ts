import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Render } from '@nestjs/common';
import { AuthUser } from 'src/auth/model/auth.user';
import { UserCreateDto } from './dto/user.create.dto';
import { UsersService } from './user.service';

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
