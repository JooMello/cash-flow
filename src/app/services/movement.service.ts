import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {InfoUser} from "../domain/info-user";
import {map} from "rxjs/operators";
import {Movement} from "../domain/movement";
import {TypeMovement} from "../domain/type-movement";

@Injectable()
export class MovementService {

  constructor(private afs: AngularFirestore) {
  }


  getInfoUser(user: string) {
    return this.afs.collection<InfoUser>('infouser')
      .ref.where('user', '==', user).get().then((infoUser) => {
        return infoUser.docs.map(data => {
          return data.data() as InfoUser;
        });
      });
  }

  getMovements(infoUser: InfoUser) {
    return this.afs
      .collection('infouser')
      .doc(infoUser.id)
      .collection('movements', ref => {
        return ref.orderBy('date', 'desc').limit(30)
      }).snapshotChanges().pipe(map(response => {
        return response.map(movements => {
          return movements.payload.doc.data() as Movement;
        });
      }));
  }

  addMovement(infoUser: InfoUser, movement: Movement) {
    movement.id = this.afs.createId();
    return this.afs
      .collection('infouser')
      .doc(infoUser.id)
      .collection('movements')
      .doc(movement.id).set(movement)
  }

  getTypeMovement() {
    return this.afs.collection('type').snapshotChanges().pipe(map(response => {
      return response.map(type => {
        return type.payload.doc.data() as TypeMovement
      })
    }))
  }

  updateMovement(infoUser: InfoUser, movement: Movement) {
    return this.afs
      .collection('infouser')
      .doc(infoUser.id)
      .collection('movements')
      .doc(movement.id)
      .update(movement);
  }

  removeMovement(infoUser: InfoUser, movement: Movement) {
    return this.afs
      .collection('infouser')
      .doc(infoUser.id)
      .collection('movements')
      .doc(movement.id)
      .delete();
  }

  filterDatesAndMovements(user: InfoUser, form: any) {
    return this.afs.collection('infouser').doc(user.id).collection('movements', ref => {
      return ref
        .where('date', '>=', form.startDate)
        .where('date', '<=', form.endDate)
        .where('type', '==', form.movement);
    }).get().pipe(map(info => {
      const movements = info.docs.map(filter => {
        return filter.data() as Movement;
      });
      return [...movements];
    }));
  }

  filterDates(user: InfoUser, form: any) {
    return this.afs.collection('infouser').doc(user.id).collection('movements', ref => {
      return ref
        .where('date', '>=', form.startDate)
        .where('date', '<=', form.endDate);
    }).get().pipe(map(info => {
      const movements = info.docs.map(filter => {
        return filter.data() as Movement;
      });
      return [...movements];
    }));
  }
}
