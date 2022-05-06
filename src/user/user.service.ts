import { Injectable, NotFoundException } from '@nestjs/common';
import { UserCreateDto } from './dto/user.create.dto';
import { UserFactory } from './factory/user.factory';
import * as admin from 'firebase-admin';

@Injectable()
export class UsersService {
	constructor(private userfactory: UserFactory) { }
	async createUser(dto: UserCreateDto, userUID: string) {
		let newUser = this.userfactory.createFromDto(dto)
		const db = admin.firestore();
		const jsonUser = JSON.stringify(newUser);
		newUser = JSON.parse(jsonUser);
		db.collection("Users").doc(userUID).set(newUser);
	}
	
	async getUserByUID(userUID: string) {
		const db = admin.firestore();
		const user = db.collection("Users").doc(userUID);
		const doc = await user.get();
		if (!doc.exists) {
 		//  кинуть ошибку
	 	} else {
			return doc.data();
		}
	}
	async getAllUsers() {
		const db = admin.firestore();
		const allUsersRef = db.collection('Users');
		const snapshot = await allUsersRef.get();
		if (snapshot.empty) {
			return 'No one User';
		}
		let allUSers = new Array();
		snapshot.forEach(doc => {
			allUSers.push(doc.data());
		});
		return allUSers;
	}
	async deleteAuthorByEmail(email: string) {
		const db = admin.firestore();
		const res = await db.collection('Users').doc(email).delete();
  }
}