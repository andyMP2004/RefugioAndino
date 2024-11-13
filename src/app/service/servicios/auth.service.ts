import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private AFauth: AngularFireAuth, private reouter : Router, private db : AngularFirestore)   { }


resetAuth(correo: string) {
  return this.AFauth.sendPasswordResetEmail(correo);

 }
 verificarCorreoEnFirebase(correo: string): Promise<boolean> {
  return this.AFauth.fetchSignInMethodsForEmail(correo)
    .then((methods) => {
      return methods.length > 0;
    })
    .catch(() => {
      return false;
    });
}
 registro(correo: string, contrasena: string) {
  return this.AFauth.createUserWithEmailAndPassword(correo, contrasena)
    
}

inicioSesion(correo: string, contrasena: string) {
  return this.AFauth.signInWithEmailAndPassword(correo, contrasena)
    
}

eliminarUsuario(idusuario: string){
  return this.AFauth.currentUser.then(user => {
    if (user) {
      // Requiere que el usuario esté autenticado
      return user.delete();
    } else {
      return null;
    }
  });
}

}