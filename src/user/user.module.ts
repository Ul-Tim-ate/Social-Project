import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { UserController } from './user.controller';
import { UserFactory } from './factory/user.factory';

@Module({
  imports: [],
  providers: [UsersService, UserFactory],
  controllers: [UserController],
  exports: [UsersService],
})
export class UserModule {}
