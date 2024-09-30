import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
@Injectable({
  providedIn: 'root'
})
export class BdService {

  public database!:SQLiteObject;


  TablaRol: string= "CREATE TABLE IF NOT EXISTS rol( idrol INTEGER PRIMARY KEY AUTOINCREMENT, nombrerol VARCHAR(30) NOT NULL)"
  TablaUsuario: string="CREATE TABLE IF NOT EXISTS usuario(idusuario INTEGER PRIMARY KEY AUTOINCREMENT,nombreusuario VARCHAR(100) NOT NULL,correo VARCHAR(100) NOT NULL,idrol  INTEGER NOT NULL,rutusuario  VARCHAR(15) NOT NULL,contrasena VARCHAR(20) NOT NULL,rolidrol INTEGER NOT NULL);";
  TablaReserva: string="CREATE TABLE IF NOT EXISTS reserva(idreserva INTEGER PRIMARY KEY AUTOINCREMENT, fechareserva DATE NOT NULL, horareserva DATE NOT NULL, FOREING KEY (usuarioidusuario) REFERENCES usuario(idusuario), FOREING KEY (habitacionidhabitacion) REFERENCES habitacion(idhabitacion) );";
  TablaHabitacion: string="CREATE TABLE IF NOT EXISTS habitacion(idhabitacion INTEGER PRIMARY KEY AUTOINCREMENT,tipohabitacion VARCHAR(40) NOT NULL, descripcion VARCHAR(200) NOT NULL, precio INTEGER NOT NULL, FOREING KEY (imagenidimagen) REFERENCES imagen(idimagen)   )"
  TablaImagen: string= "CREATE TABLE IF NOT EXISTS imagen( idimagen INTEGER PRIMARY KEY AUTOINCREMENT, urlimagen VARCHAR(500) NOT NULL)"
  TablaContacto: string= "CREATE TABLE IF NOT EXISTS contacto(idcontacto INTEGER PRIMARY KEY AUTOINCREMENT, telefono INTEGER NOT NULL, nombre VARCHAR(60) NOT NULL, correousu VARCHAR(100) NOT NULL, mensaje VARCHAR(500)NOT NULL)"
  constructor() { }
}
