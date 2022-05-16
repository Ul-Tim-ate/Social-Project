import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ProjectCreateDto } from './dto/project.create.dto';
import { ProjectFactory } from './factory/project.factory';
import * as admin from 'firebase-admin';
import { ProjectEntity } from './model/project.entity';
import { FieldValue } from 'firebase-admin/firestore';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/user/user.service';

@Injectable()
export class ProjectsService {
  constructor(
    private projectfactory: ProjectFactory,
    private authService: AuthService,
    private userService: UsersService,
  ) {}
  async createProject(dto: ProjectCreateDto): Promise<string> {
    let newProject = this.projectfactory.createFromDto(dto);
    const db = admin.firestore();
    const jsonUser = JSON.stringify(newProject);
    newProject = JSON.parse(jsonUser);
    const response = await db.collection('Projects').add(newProject);
    return response.id;
  }
  async getAllProjects(): Promise<ProjectEntity[]> {
    const db = admin.firestore();
    const allUsersRef = db.collection('Projects');
    const snapshot = await allUsersRef.get();
    if (snapshot.empty) {
      // кинуть ошибку
    }
    let allProjects = new Array();
    snapshot.forEach((doc) => {
      allProjects.push(doc.data());
    });
    return allProjects;
  }
  async getProject(id: string) {
    const db = admin.firestore();
    const user = db.collection('Projects').doc(id);
    const doc = await user.get();
    if (!doc.exists) {
      //  кинуть ошибку
      console.log('error');
    } else {
      return doc.data();
    }
  }
  async updateCurrentSumAndInvestedUsers(projectID: string, addSum: number) {
    let user;
    try {
      user = await this.authService.getCurrentUser();
    } catch (error) {
      throw new UnauthorizedException();
    }
    this.userService.donateToProject(user.uid, projectID, addSum);
    const db = admin.firestore();
    const project = db.collection('Projects').doc(projectID);
    project.update({
      currentSum: FieldValue.increment(addSum),
      investedUsersUID: FieldValue.arrayUnion(user.uid),
    });
  }
  async getProjectByName(projectName: string) {
    const db = admin.firestore();
    const citiesRef = db.collection('Projects');
    const project = await citiesRef.where('name', '==', projectName).get();
    if (project.empty) {
      console.log('No matching documents.');
      return;
    }
    let projectProperties;
    project.forEach((doc) => {
      projectProperties = doc.data();
    });
    return projectProperties;
  }
}
