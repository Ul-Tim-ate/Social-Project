export class UserEntity {
  email: string;
  passwordHash: string;
  countOfOpens: number;
	dateOfRegist: Date;
	supportedProjects: Array<Object>
}
