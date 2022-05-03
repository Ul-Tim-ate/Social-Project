import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { UserCreateDto } from './dto/user.create.dto';
import { UsersService } from './user.service';

@Controller('/user')
export class UserController {
	constructor(private readonly userService: UsersService) {}
  @Post()
	async createUser(@Body() user: UserCreateDto) {
		return this.userService.createUser(user);
	}
	@Get('/:email')
	async getUserByEmail(@Param('email') email: string) {
		return this.userService.getUserByEmail(email);
	}

	@Delete('/:email')
	async deleteUserByEmail(@Param('email') email: string) {
    return this.userService.deleteAuthorByEmail(email);
	}

	@Get('')
  async getAllUsers() {
    return this.userService.getAllUsers();
	}
}
