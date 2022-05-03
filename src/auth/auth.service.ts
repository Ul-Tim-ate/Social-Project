import { Injectable } from '@nestjs/common';
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { firebaseConfig } from './firebaseConfig';
import { AuthUser } from './model/auth.user';
import { UsersService } from 'src/user/user.service';


@Injectable()
export class AuthService {
	constructor(private readonly userService: UsersService) {
		const app = initializeApp(firebaseConfig);
		const auth = getAuth(app);
	}
	async createUserByEmail(newUser: AuthUser) {
		const auth = getAuth();
		createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
  		.then((userCredential) => {
    	const user = userCredential.user;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
	});
		const d = {
			email: newUser.email,
			password: newUser.password,
			dateOfRegist: new Date()
		};
		this.userService.createUser(d)
  }
}
