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
import { Estado } from './estado';
import { Tipo } from './tipo';
import { Detalle } from './detalle';

@Injectable({
  providedIn: 'root'
})
export class BdService {
  public database!: SQLiteObject;

  TablaRol: string = "CREATE TABLE IF NOT EXISTS rol(idrol INTEGER PRIMARY KEY AUTOINCREMENT, nombrerol VARCHAR(30) NOT NULL)";
  registroRol: string = "INSERT or IGNORE INTO rol(idrol, nombrerol) VALUES (1, 'admin')";

  TablaUsuario: string = "CREATE TABLE IF NOT EXISTS usuario(idusuario INTEGER PRIMARY KEY AUTOINCREMENT, nombreusuario VARCHAR(100) NOT NULL, correo VARCHAR(100) NOT NULL, rutusuario VARCHAR(15) NOT NULL, contrasena VARCHAR(20) NOT NULL, fechanaci VARCHAR(50) NOT NULL, telefono INTEGER, rolidrol INTEGER, FOREIGN KEY (rolidrol) REFERENCES rol(idrol))";
  registroUsuario: string = "INSERT or IGNORE INTO usuario(idusuario, nombreusuario, correo, rutusuario, contrasena, fechanaci, telefono, rolidrol) VALUES (1, 'andy madrid', 'madridpolancoa@gmail.com','21687221-5', 'Andymadrid12','21/04/2004','943432345', 1)";

  TablaReserva: string = "CREATE TABLE IF NOT EXISTS reserva(idreserva INTEGER PRIMARY KEY AUTOINCREMENT, fechareserva DATE, total VARCHAR(30), usuarioidusuario INTEGER, FOREIGN KEY (usuarioidusuario) REFERENCES usuario(idusuario))";
  registroReserva: string = "INSERT or IGNORE INTO reserva(idreserva, fechareserva, total, usuarioidusuario) VALUES (1, '2024-10-06', '14000', 1)";

  TablaHabitacion: string = "CREATE TABLE IF NOT EXISTS habitacion(idhabitacion INTEGER PRIMARY KEY AUTOINCREMENT, nombrehabi VARCHAR(50) NOT NULL, idtipo INTEGER, idestado INTEGER, FOREIGN KEY (idtipo) REFERENCES tipo(idtipo), FOREIGN KEY (idestado) REFERENCES estado(idestado))";
  registroHabitacion: string = "INSERT or IGNORE INTO habitacion(idhabitacion, nombrehabi, idtipo, idestado) VALUES (1, 'hfamiliar', 1, 1)";
  registroHabitacion2: string = "INSERT or IGNORE INTO habitacion(idhabitacion, nombrehabi, idtipo, idestado) VALUES (2, 'hfamiliar', 2, 2)";
  registroHabitacion3: string = "INSERT or IGNORE INTO habitacion(idhabitacion, nombrehabi, idtipo, idestado) VALUES (3, 'hsuite', 3, 3)";
  registroHabitacion4: string = "INSERT or IGNORE INTO habitacion(idhabitacion, nombrehabi, idtipo, idestado) VALUES (4, 'hpresidencial', 4, 4)";

  TablaEstado: string = "CREATE TABLE IF NOT EXISTS estado(idestado INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(50) NOT NULL)";
  registroEstado: string = "INSERT or IGNORE INTO estado(idestado, nombre) VALUES (1, 'disponible')";
  registroEstado2: string = "INSERT or IGNORE INTO estado(idestado, nombre) VALUES (2, 'no disponible')";

  TablaTipo: string = "CREATE TABLE IF NOT EXISTS tipo(idtipo INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(50) NOT NULL, imagen VARCHAR(100) NOT NULL, precio VARCHAR(50) NOT NULL, descripcion VARCHAR(200) NOT NULL)";
  registroTipo: string = "INSERT or IGNORE INTO tipo(idtipo, nombre, imagen, precio, descripcion) VALUES (1, 'Habitacion Familiar', 'http/imagen.jpg', '$14.000', '2 camas para que te sientas como rey')";

  TablaDetalle: string = `
  CREATE TABLE IF NOT EXISTS detalle(
    iddetalle INTEGER PRIMARY KEY AUTOINCREMENT,
    cantidad INTEGER NOT NULL,
    finicio VARCHAR(40) NOT NULL,
    subtotal VARCHAR(40) NOT NULL,
    idreserva INTEGER,  -- Añadir columna para idreserva
    idhabitacion INTEGER,  -- Añadir columna para idhabitacion
    FOREIGN KEY (idreserva) REFERENCES reserva(idreserva),  -- Corregir clave foránea
    FOREIGN KEY (idhabitacion) REFERENCES habitacion(idhabitacion)  -- Corregir clave foránea
  )`;
  
  registroDetalle: string = "INSERT or IGNORE INTO detalle(iddetalle, cantidad, finicio, subtotal, idreserva, idhabitacion) VALUES (1, 3, '10/04/2024', '$42.000', 1, 1)";

  listadoRol = new BehaviorSubject<Rol[]>([]);
  listadoUsuario = new BehaviorSubject<Usuario[]>([]);
  listadoReserva = new BehaviorSubject<Reserva[]>([]);
  listadoHabitacion = new BehaviorSubject<Habitacion[]>([]);
  listadoEstado = new BehaviorSubject<Estado[]>([]);
  listadoTipo = new BehaviorSubject<Tipo[]>([]);
  listadoDetalle = new BehaviorSubject<Detalle[]>([]);

  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite, private platform: Platform, private alertController: AlertController) {
    this.createBD();
  }

  async presentAlert(titulo: string, msj: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msj,
      buttons: ['OK'],
    });
    await alert.present();
  }

  fetchRol(): Observable<Rol[]> {
    return this.listadoRol.asObservable();
  }

  fetchUsuario(): Observable<Usuario[]> {
    return this.listadoUsuario.asObservable();
  }

  fetchReserva(): Observable<Reserva[]> {
    return this.listadoReserva.asObservable();
  }

  fetchHabitacion(): Observable<Habitacion[]> {
    return this.listadoHabitacion.asObservable();
  }

  fetchEstado(): Observable<Estado[]> {
    return this.listadoEstado.asObservable();
  }

  fetchTipo(): Observable<Tipo[]> {
    return this.listadoTipo.asObservable();
  }

  fetchDetalle(): Observable<Detalle[]> {
    return this.listadoDetalle.asObservable();
  }

  dbState() {
    return this.isDBReady.asObservable();
  }

  createBD() {
    // Verificar si la plataforma está disponible
    this.platform.ready().then(() => {
      // Crear la Base de Datos
      this.sqlite.create({
        name: 'bd',
        location: 'default'
      }).then((db: SQLiteObject) => {
        // Capturar la conexión a la BD
        this.database = db;
        // Eliminar la base de datos existente para recrearla
        this.sqlite.deleteDatabase({ name: 'bd', location: 'default' }).then(() => {
          // Llamamos a la función para crear las tablas
          this.crearTablas();
        });
      }).catch(e => {
        this.presentAlert('Base de Datos', 'Error en crear la BD: ' + JSON.stringify(e));
      });
    });
  }

  async crearTablas() {
    try {
      // Enable foreign key constraints
      await this.database.executeSql("PRAGMA foreign_keys = ON", []);

      // Create tables in the correct order
      await this.database.executeSql(this.TablaRol, []); // Create 'rol' table first
      await this.database.executeSql(this.TablaEstado, []); // Create 'estado' table
      await this.database.executeSql(this.TablaTipo, []); // Create 'tipo' table
      await this.database.executeSql(this.TablaUsuario, []); // Create 'usuario' table
      await this.database.executeSql(this.TablaHabitacion, []); // Create 'habitacion' table
      await this.database.executeSql(this.TablaReserva, []); // Create 'reserva' table
      await this.database.executeSql(this.TablaDetalle, []); // Create 'detalle' table

      // Insert initial data
      await this.database.executeSql(this.registroRol, []);
      await this.database.executeSql(this.registroEstado, []);
      await this.database.executeSql(this.registroEstado2, []);
      await this.database.executeSql(this.registroTipo, []);
      await this.database.executeSql(this.registroUsuario, []);
      await this.database.executeSql(this.registroHabitacion, []);
      await this.database.executeSql(this.registroHabitacion2, []);
      await this.database.executeSql(this.registroHabitacion3, []);
      await this.database.executeSql(this.registroHabitacion4, []);
      await this.database.executeSql(this.registroReserva, []);
      await this.database.executeSql(this.registroDetalle, []);

      this.seleccionarUsuarios();
      this.seleccionarHabitaciones();
      this.isDBReady.next(true);
    } catch (e) {
      this.presentAlert('Creación de Tablas', 'Error en crear las tablas: ' + JSON.stringify(e));
    }
  }

  seleccionarUsuarios() {
    return this.database.executeSql('SELECT idusuario, nombreusuario, rutusuario FROM usuario', []).then(res => {
      // Variable para almacenar el resultado de la consulta
      let items: Usuario[] = [];
      // Valido si trae al menos un registro
      if (res.rows.length > 0) {
        // Recorro mi resultado
        for (var i = 0; i < res.rows.length; i++) {
          // Agrego los registros a mi lista
          items.push({
            idusuario: res.rows.item(i).idusuario,
            nombreusuario: res.rows.item(i).nombreusuario,
            rutusuario: res.rows.item(i).rutusuario
          });
        }
      }
      // Actualizar el observable
      this.listadoUsuario.next(items as any);
    });
  }

  seleccionarHabitaciones() {
    return this.database.executeSql('SELECT COUNT(idhabitacion) AS cantidad, tipohabitacion FROM habitacion GROUP BY tipohabitacion', []).then(res => {
      // Variable para almacenar el resultado de la consulta
      let items: Habitacion[] = [];
      // Valido si trae al menos un registro
      if (res.rows.length > 0) {
        // Recorro mi resultado
        for (var i = 0; i < res.rows.length; i++) {
          // Agrego los registros a mi lista
          items.push({
            cantidad: res.rows.item(i).cantidad,
            tipohabitacion: res.rows.item(i).tipohabitacion

          });
        }
      }
      // Actualizar el observable
      this.listadoHabitacion.next(items as any);
    });
  }
   eliminarUsuario(idusuario:string){
    return this.database.executeSql('DELETE FROM usuario WHERE idusuario = ?',[idusuario]).then(res=>{
      this.presentAlert("Eliminar","USUARIO ELIMINADO");
      this.seleccionarUsuarios();
    }).catch(e=>{
      this.presentAlert('Eliminar', 'Error: ' + JSON.stringify(e));
    })
  }
}

