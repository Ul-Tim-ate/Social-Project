import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Redirect,
  Render,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/user/user.service';
import { ProjectCreateDto } from './dto/project.create.dto';
import { ProjectsService } from './projects.service';

@Controller('/projects')
export class ProjectsController {
  constructor(
    private readonly projectService: ProjectsService,
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Redirect()
  @Post('create-project')
  async createProject(@Body() project: ProjectCreateDto) {
    const projectID = await this.projectService.createProject(project);
    return { url: `${process.env.HOST}projects/${projectID}` };
  }

  @Render('projects')
  @Get()
  async getAllProjects() {
    const projects = await this.projectService.getAllProjects();
    return { projects: projects };
  }

  @Render('project-detailed')
  @Get('/:projectName')
  async getProject(@Param('projectName') projectName: string) {
    return await this.projectService.getProjectByName(projectName);
  }

  @Redirect()
  @Post('/:projectName')
  async addSumToProject(
    @Param('projectName') projectName: string,
    @Body() dto,
  ) {
    const { id } = await this.projectService.getProjectByName(projectName);
    await this.projectService.updateCurrentSumAndInvestedUsers(
      id,
      parseInt(dto.scores),
    );
    return { url: `${process.env.PROJECT_PAGE}${projectName}` };
  }
}
