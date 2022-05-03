import { Injectable } from '@nestjs/common';
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { firebaseConfig } from './firebaseConfig';
import { AuthUser } from './model/auth.user';
import { UsersService } from 'src/user/user.service';
import { GoogleAuthProvider } from "firebase/auth";


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
	async login(newUser: AuthUser) {
		const auth = getAuth();
	  signInWithEmailAndPassword(auth, newUser.email, newUser.password)
   .then((userCredential) => {
		 const user = userCredential.user;
		 console.log(user);
  })
  .catch((error) => {
    const errorCode = error.code;
		const errorMessage = error.message;
		console.log(errorCode, errorMessage);
	});
	}
	async createUserByGoogle() {
		const auth = getAuth();
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider)
			.then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
				const credential = GoogleAuthProvider.credentialFromResult(result);
				const token = credential.accessToken;
    // The signed-in user info.
				const user = result.user;
				console.log(user);


    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
	}
}
