import { IsDateString, IsDefined, IsNumber, IsString } from 'class-validator';

export class UserCreateDto {

	@IsString()
	@IsDefined()
 public email: string;

	@IsDefined()
	@IsString()
 public password: string;

	@IsDefined()
	@IsDateString()
	public dateOfRegist: Date;
}