import {
	ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserCreateDto } from './dto/user.create.dto';
import { UserFactory } from './factory/user.factory';
import * as admin from 'firebase-admin';

@Injectable()
export class UsersService {
  constructor(private userfactory: UserFactory) {}
  async createUser(dto: UserCreateDto, userUID: string) {
    let newUser = this.userfactory.createFromDto(dto);
    const db = admin.firestore();
    const jsonUser = JSON.stringify(newUser);
    newUser = JSON.parse(jsonUser);

    db.collection('Users')
      .doc(userUID)
      .set(newUser)
			.catch(() => {
				throw new ConflictException();
			});
  }

  async getUserByUID(userUID: string) {
    const db = admin.firestore();
    const user = db.collection('Users').doc(userUID);
    const doc = await user.get();
    if (!doc.exists) {
      throw new NotFoundException();
    } else {
      return doc.data();
    }
  }
  async getAllUsers() {
    const db = admin.firestore();
    const allUsersRef = db.collection('Users');
    const snapshot = await allUsersRef.get();
    if (snapshot.empty) {
      throw new NotFoundException();
    }
    let allUSers = new Array();
    snapshot.forEach((doc) => {
      allUSers.push(doc.data());
    });
    return allUSers;
  }
  async deleteUserByUID(userUID: string) {
    const db = admin.firestore();
    try {
      const res = await db.collection('Users').doc(userUID).delete();
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
