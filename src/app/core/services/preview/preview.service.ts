import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class PreviewService {

  constructor(private angularFireDatabase: AngularFireDatabase) { }
  setClickedArticle(key:string){
    localStorage.setItem('/startups/', key)
 }

 getClickedAritcleId(){
    return localStorage.getItem('/startups/');
 }
 getById(key: string) {
  return this.angularFireDatabase.object('/startups/' + key).valueChanges();
}

}
