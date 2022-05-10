import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { ProjectFactory } from './factory/project.factory';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [AuthModule, UserModule],
  providers: [ProjectsService, ProjectFactory],
  controllers: [ProjectsController],
})
export class ProjectsModule {}
