export class UserEntity {
  email: string;
  passwordHash: string;
  countOfOpens: number;
	dateOfRegist: Date;
	// supportedProjects: Map<string, number>;
}
