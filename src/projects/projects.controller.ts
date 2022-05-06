import { ArgumentsHost, Body, Controller, Get, HostParam, Param, Post, Put, Redirect, Render, Req } from '@nestjs/common';
import { ProjectCreateDto } from './dto/project.create.dto';
import { ProjectsService } from './projects.service';
import { Request, Response } from 'express';

@Controller('/projects')
export class ProjectsController {
	constructor(private readonly projectService: ProjectsService) { }

	@Redirect()
	@Post('create-project')
	async createProject(@Body() project: ProjectCreateDto) {
		const projectID = await this.projectService.createProject(project)
		return { url: `http://localhost:4000/projects/${projectID}` };
	}

	@Render('projects-list')
	@Get()
	async getAllProjects() {
		const projects = await this.projectService.getAllProjects();
		const projectsName = [];
		projects.forEach(element => {
			projectsName.push(element.name);
		});
		return { projects: projectsName};
	}
	@Render('project')
	@Get('/:projectID')
	async getProject(@Param('projectID') projectID: string) {
    return this.projectService.getProject(projectID);
	}


	@Post('/:projectID')
	async addPointToProject(@Param('projectID') projectID: string, @Body() dto) {
		return await this.projectService.addPointToProject(projectID, parseInt( dto.countOfPOints));
	}
}
