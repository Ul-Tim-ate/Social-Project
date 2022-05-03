import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { UsersService } from 'src/user/user.service';
import { UserFactory } from 'src/user/factory/user.factory';

@Module({
	imports: [UserModule],
  providers: [AuthService, UsersService, UserFactory],
  controllers: [AuthController]
})
export class AuthModule {}
