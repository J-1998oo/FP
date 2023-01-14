import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, map } from 'rxjs';
import { Sectors } from '../../interfaces/sector.interface';

@Injectable({
  providedIn: 'root'
})
export class SectorsService {
  dbPath = '/sectors';
  sectorsRef!: AngularFireList<Sectors>;

  constructor(private angularFireDatabase: AngularFireDatabase) {
    this.sectorsRef = angularFireDatabase.list(this.dbPath);
  }
  getAll(): Observable<any> {
    return this.sectorsRef
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((obj) => ({ id: obj.payload.key, ...obj.payload.val() }))
        )
      );
  }


  getById(id: string) {
    return this.angularFireDatabase.object('/sectors/' + id).valueChanges();
  }
  create(sector: Sectors) {
    return this.sectorsRef.push(sector);
  }
  update(key: string, sector: Sectors) {
    return this.sectorsRef.update(key, sector);
  }
  delete(key: string) {
    return this.sectorsRef.remove(key);
  }
  deleteAll() {
    return this.sectorsRef.remove();
  }

}
