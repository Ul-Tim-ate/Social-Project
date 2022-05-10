import { Injectable, BadRequestException } from '@nestjs/common';
import { UserCreateDto } from '../dto/user.create.dto';
import { UserEntity } from '../models/entity/user.entity';

@Injectable()
export class UserFactory {
  public createFromDto(dto: UserCreateDto) {
    const user = new UserEntity();
    user.countOfOpens = 0; //
    user.email = dto.email;
    user.dateOfRegist = dto.dateOfRegist;
		user.passwordHash = dto.password; //нужно добавить хэширование bcrypt
    return user;
  }
}
