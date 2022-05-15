import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Redirect,
  Render,
} from '@nestjs/common';
import { ProjectCreateDto } from './dto/project.create.dto';
import { ProjectsService } from './projects.service';

@Controller('/projects')
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}

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
  @Post('/:projectID')
  async addSumToProject(@Param('projectID') projectID: string, @Body() dto) {
    await this.projectService.updateCurrentSumAndInvestedUsers(
      projectID,
      parseInt(dto.countOfPOints),
    );
    return { url: `${process.env.PROJECT_PAGE}${projectID}` };
  }
}
