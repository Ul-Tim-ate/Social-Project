import { Injectable, BadRequestException } from "@nestjs/common";
import { ProjectCreateDto } from "../dto/project.create.dto";
import { ProjectEntity } from "../model/project.entity";

@Injectable()
export class ProjectFactory {
  public createFromDto(dto: ProjectCreateDto) {
   const project = new ProjectEntity();
	 project.name = dto.name;
	 project.description = dto.description;
	 project.totalSum = dto.totalSum;
	 project.currentSum = 0;
	 project.investedUsersUID = [];
   return project;
  }
}