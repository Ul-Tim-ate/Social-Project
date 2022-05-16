import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { UsersService } from 'src/user/user.service';
import { UserFactory } from 'src/user/factory/user.factory';
import { VerifyEmailGuard } from 'src/guards/email.verify.guard';

@Module({
  imports: [forwardRef(() => UserModule)],
  providers: [AuthService, UsersService, UserFactory, VerifyEmailGuard],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
