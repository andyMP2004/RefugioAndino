import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private AFauth: AngularFireAuth, private reouter : Router, private db : AngularFirestore) { }


resetAuth(correo: string) {
  return this.AFauth.sendPasswordResetEmail(correo);

 }

 registro(correo: string, contrasena: string) {
  return this.AFauth.createUserWithEmailAndPassword(correo, contrasena)
    
}

}