import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class AppService {
  async getHello() {
// 			const db = admin.firestore();
// 			const data = {
// 				id: 2,
// 				name: "Dima"
// 			}
// 			db.collection("Customers").doc(data.id.toString()).set(data);
// 			const snapshot = await db.collection('Customers').get();
//    snapshot.forEach((doc) => {
//    console.log(doc.id, '=>', doc.data());
// });
}
}
