import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Contacto } from './contacto';
import { Rol } from './rol';
import { Usuario } from './usuario';
import { Reserva } from './reserva';
import { Habitacion } from './habitacion';
import { Imagen } from './imagen';
@Injectable({
  providedIn: 'root'
})
export class BdService {

  public database!:SQLiteObject;


  TablaRol: string= "CREATE TABLE IF NOT EXISTS rol( idrol INTEGER PRIMARY KEY AUTOINCREMENT, nombrerol VARCHAR(30) NOT NULL)";

  registroRol: string = "INSERT or IGNORE INTO rol(idrol, nombrerol) VALUES ";

  TablaUsuario: string="CREATE TABLE IF NOT EXISTS usuario(idusuario INTEGER PRIMARY KEY AUTOINCREMENT,nombreusuario VARCHAR(100) NOT NULL,correo VARCHAR(100) NOT NULL,FOREING KEY (rolidrol) REFERENCES rol(idrol)  INTEGER NOT NULL,rutusuario  VARCHAR(15) NOT NULL,contrasena VARCHAR(20) NOT NULL);";
  
  registroUsuario: string = "INSERT or IGNORE INTO usuario(idusuario, nombreusuario, correo , idrol, rutusuario, contrasena ) VALUES";
  
  TablaReserva: string="CREATE TABLE IF NOT EXISTS reserva(idreserva INTEGER PRIMARY KEY AUTOINCREMENT, fechareserva DATE NOT NULL, horareserva DATE NOT NULL, FOREING KEY (usuarioidusuario) REFERENCES usuario(idusuario), FOREING KEY (habitacionidhabitacion) REFERENCES habitacion(idhabitacion) );";
  
  registroReserva: string = " INSERT or IGNORE INTO reserva(idreserva, fechareserva, horareserva, idusuario, idhabitacion)VALUES  ";
  
  TablaHabitacion: string="CREATE TABLE IF NOT EXISTS habitacion(idhabitacion INTEGER PRIMARY KEY AUTOINCREMENT,tipohabitacion VARCHAR(40) NOT NULL, descripcion VARCHAR(200) NOT NULL, precio INTEGER NOT NULL, FOREING KEY (imagenidimagen) REFERENCES imagen(idimagen))";
  
  registroHabitacion: string = "INSERT or IGNORE INTO habitacion(idhabitacion, tipo, descripcion, precio, idimagen) VALUES";
  
  TablaImagen: string= "CREATE TABLE IF NOT EXISTS imagen( idimagen INTEGER PRIMARY KEY AUTOINCREMENT, urlimagen VARCHAR(500) NOT NULL)";
  
  registroImagen: string = "INSERT or IGNORE INTO imagen(idimagen, urlimagen) VALUES";
  
  TablaContacto: string= "CREATE TABLE IF NOT EXISTS contacto(idcontacto INTEGER PRIMARY KEY AUTOINCREMENT, telefono INTEGER NOT NULL, nombre VARCHAR(60) NOT NULL, correousu VARCHAR(100) NOT NULL, mensaje VARCHAR(500)NOT NULL)";
  
  registroContacto: string = "INSERT or IGNORE INTO contacto(idcontacto, telefono, nombre, correousu,mensaje) VALUES";
  
  listadoRol = new BehaviorSubject([]);
  listadoUsuario = new BehaviorSubject([]);
  listadoReserva = new BehaviorSubject([]);
  listadoHabitacion = new BehaviorSubject([]);
  listadoImagen = new BehaviorSubject([]);
  listadoContacto = new BehaviorSubject([]);
  
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  
  constructor(private sqlite: SQLite, private platform: Platform, private alertController: AlertController) {
    this.createBD();
   }
   async presentAlert(titulo: string, msj:string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msj,
      buttons: ['OK'],
    });
  
  await alert.present();
  }

  //metodos para manipular los observables
  fetchRol(): Observable<Rol[]>{
    return this.listadoRol.asObservable();
  }
  fetchUsuario(): Observable<Usuario[]>{
    return this.listadoRol.asObservable();
  }
  fetchResera(): Observable<Reserva[]>{
    return this.listadoRol.asObservable();
  }
  fetchHabitacion(): Observable<Habitacion[]>{
    return this.listadoRol.asObservable();
  }
  fetchImagen(): Observable<Imagen[]>{
    return this.listadoRol.asObservable();
  }
  fetchContacto(): Observable<Contacto[]>{
    return this.listadoRol.asObservable();
  }

  dbState(){
    return this.isDBReady.asObservable();
  }
  createBD(){
    //varificar si la plataforma esta disponible
    this.platform.ready().then(()=>{
      //crear la Base de Datos
      this.sqlite.create({
        name: 'RefugioAndino.db',
        location: 'default'
      }).then((db: SQLiteObject)=>{
        //capturar la conexion a la BD
        this.database = db;
        //llamamos a la función para crear las tablas
        this.crearTablas();
      }).catch(e=>{
        this.presentAlert('Base de Datos', 'Error en crear la BD: ' + JSON.stringify(e));
      })
    })

  }
  async crearTablas(){
    try{
      //ejecuto la creación de Tablas
      await this.database.executeSql(this.TablaContacto, []);
      await this.database.executeSql(this.TablaHabitacion, []);
      await this.database.executeSql(this.TablaImagen, []);
      await this.database.executeSql(this.TablaReserva, []);
      await this.database.executeSql(this.TablaRol, []);
      await this.database.executeSql(this.TablaUsuario, []);



      //ejecuto los insert por defecto en el caso que existan
      //await this.database.executeSql(this.registroNoticia, []);
      
      await  this.database.executeSql(this.registroContacto,[]);
      await  this.database.executeSql(this.registroHabitacion,[]);
      await  this.database.executeSql(this.registroImagen,[]);
      await  this.database.executeSql(this.registroReserva,[]);
      await  this.database.executeSql(this.registroRol,[]);
      await  this.database.executeSql(this.registroUsuario,[]);



      //modifico el estado de la Base de Datos
      this.isDBReady.next(true);

    }catch(e){
      this.presentAlert('Creación de Tablas', 'Error en crear las tablas: ' + JSON.stringify(e));
    }
  }


}
