import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class AppService {
  async getHello() {
			const db = admin.firestore();
			const data = {
				id: 1,
				name: "Tima"
			}
			db.collection("Customers").doc(data.id.toString()).set(data);
		}
}
