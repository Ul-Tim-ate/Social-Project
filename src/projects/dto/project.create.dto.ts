import { IsDefined, IsString } from 'class-validator';

export class ProjectCreateDto {

	@IsDefined()
	@IsString()
	public name: string;

	@IsDefined()
	@IsString()
	public description: string;

	@IsDefined()
	@IsString()
 	public totalSum: number;
}