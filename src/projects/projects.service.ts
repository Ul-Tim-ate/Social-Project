import { Injectable } from '@nestjs/common';
import { ProjectCreateDto } from './dto/project.create.dto';
import { ProjectFactory } from './factory/project.factory';
import * as admin from 'firebase-admin';
import { ProjectEntity } from './model/project.entity';
import { FieldValue } from 'firebase-admin/firestore';
import { getAuth } from 'firebase/auth';

@Injectable()
export class ProjectsService {
  constructor(private projectfactory: ProjectFactory) {}
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
  async addPointToProject(id: string, points: number) {
    const db = admin.firestore();
    const project = db.collection('Projects').doc(id);
    await project.update({ currentSum: FieldValue.increment(points) });
    const auth = getAuth();
    const user = auth.currentUser;
    console.log(user.uid);
  }
}
