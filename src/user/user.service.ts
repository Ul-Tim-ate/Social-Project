import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserCreateDto } from './dto/user.create.dto';
import { UserFactory } from './factory/user.factory';
import * as admin from 'firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { UserEntity } from './models/entity/user.entity';

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
  async donateToProject(userUID: string, projectID: string, sumDonate: number) {
    const db = admin.firestore();
    const user = db.collection('Users').doc(userUID);
    const data = await user.get();
    if (data.data().supportedProjects != '') {
      data.data().supportedProjects.forEach((element) => {
        if (element.projectID == projectID) {
          sumDonate += +element.sumDonate;
          user.update({
            supportedProjects: FieldValue.arrayRemove(element),
          });
        }
      });
    }
    user.update({
      supportedProjects: FieldValue.arrayUnion({
        projectID,
        sumDonate,
      }),
    });
  }
  incCountOfOpens(userUID: string) {
    const db = admin.firestore();
    const user = db.collection('Users').doc(userUID);
    user.update({
      countOfOpens: FieldValue.increment(1),
    });
  }
  async getAllCollected() {
    const db = admin.firestore();
    const allUsersRef = db.collection('Users');
    const snapshot = await allUsersRef.get();
    if (snapshot.empty) {
      throw new NotFoundException();
    }
    let allCollected = 0;
    snapshot.forEach((doc) => {
      allCollected += +doc.data().countOfOpens; //allUSers.push(doc.data());
    });
    return allCollected;
  }
}
