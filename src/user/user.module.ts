import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { UserController } from './user.controller';
import { UserFactory } from './factory/user.factory';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [forwardRef(() => AuthModule)],
  providers: [UsersService, UserFactory],
  controllers: [UserController],
  exports: [UsersService],
})
export class UserModule {}
