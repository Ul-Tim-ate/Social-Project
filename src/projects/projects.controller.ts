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

  @Render('projects-list')
  @Get()
  async getAllProjects() {
    const projects = await this.projectService.getAllProjects();
    const projectsName = [];
    projects.forEach((element) => {
      projectsName.push(element.name);
    });
    return { projects: projectsName };
  }

  @Render('project')
  @Get('/:projectID')
  getProject(@Param('projectID') projectID: string) {
    return this.projectService.getProject(projectID);
  }

  @Post('/:projectID')
  async addPointToProject(@Param('projectID') projectID: string, @Body() dto) {
    return await this.projectService.addPointToProject(
      projectID,
      parseInt(dto.countOfPOints),
    );
  }
}
