import { Injectable, UnauthorizedException } from '@nestjs/common';
import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  deleteUser,
  getAuth,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';
import {} from 'firebase/app';
import { firebaseConfig } from './firebaseConfig';
import { AuthUser } from './model/auth.user';
import { UsersService } from 'src/user/user.service';
import {} from 'firebase-admin/app';
import * as admin from 'firebase-admin';

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
        const d = {
          email: newUser.email,
          password: newUser.password,
          dateOfRegist: new Date(),
        };
        this.userService.createUser(d, user.uid);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        throw new Error('ошибки при создании пользователя');
      });
  }

  async login(newUser: AuthUser): Promise<string> {
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(
      auth,
      newUser.email,
      newUser.password,
    );
    const user = userCredential.user;
    return user.uid;
  }
  checkAuth(): boolean {
    const auth = getAuth();
		const user = auth.currentUser;
		return user ? true : false;
  }
  async userIsExist(email: string) {
    const emailExists = await admin
      .auth()
      .getUserByEmail(email)
      .then(() => true)
      .catch(() => false);
    return emailExists;
  }
  emailIsVerified() {
    const auth = getAuth();
    const user = auth.currentUser;
    return user.emailVerified;
  }
  verifyEmail() {
    const auth = getAuth();
    sendEmailVerification(auth.currentUser);
  }
  getCurrentUser(): User {
    const auth = getAuth();
    return auth.currentUser;
  }
  signOut() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        console.log(error.message);
      });
  }
  deleteUser() {
    const auth = getAuth();
    const user = auth.currentUser;
    deleteUser(user)
      .then(() => {
        this.userService.deleteUserByUID(user.uid);
      })
      .catch((error) => {
        // An error ocurred
        // ...
      });
  }
}
