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

  public database!: SQLiteObject;

  TablaRol: string = "CREATE TABLE IF NOT EXISTS rol(idrol INTEGER PRIMARY KEY AUTOINCREMENT, nombrerol VARCHAR(30) NOT NULL)";
  registroRol: string = "INSERT or IGNORE INTO rol(idrol, nombrerol) VALUES (1, 'admin')";

  TablaUsuario: string = "CREATE TABLE IF NOT EXISTS usuario(idusuario INTEGER PRIMARY KEY AUTOINCREMENT, nombreusuario VARCHAR(100) NOT NULL, correo VARCHAR(100) NOT NULL, rolidrol INTEGER NOT NULL, rutusuario VARCHAR(15) NOT NULL, contrasena VARCHAR(20) NOT NULL, FOREIGN KEY (rolidrol) REFERENCES rol(idrol))";
  registroUsuario: string = "INSERT or IGNORE INTO usuario(idusuario, nombreusuario, correo, rolidrol, rutusuario, contrasena) VALUES (1, 'andy madrid', 'madridpolancoa@gmail.com', 2, '21687221-5', 'Andymadrid12')";

  TablaReserva: string = "CREATE TABLE IF NOT EXISTS reserva(idreserva INTEGER PRIMARY KEY AUTOINCREMENT, fechareserva DATE NOT NULL, horareserva TIME NOT NULL, usuarioidusuario INTEGER, habitacionidhabitacion INTEGER, FOREIGN KEY (usuarioidusuario) REFERENCES usuario(idusuario), FOREIGN KEY (habitacionidhabitacion) REFERENCES habitacion(idhabitacion))";
  registroReserva: string = "INSERT or IGNORE INTO reserva(idreserva, fechareserva, horareserva, usuarioidusuario, habitacionidhabitacion) VALUES (1, '2024-10-06', '02:35', 1, 1)";

  TablaHabitacion: string = "CREATE TABLE IF NOT EXISTS habitacion(idhabitacion INTEGER PRIMARY KEY AUTOINCREMENT, tipohabitacion VARCHAR(40) NOT NULL, descripcion VARCHAR(200) NOT NULL, precio INTEGER NOT NULL, imagenidimagen INTEGER, FOREIGN KEY (imagenidimagen) REFERENCES imagen(idimagen))";
  registroHabitacion: string = "INSERT or IGNORE INTO habitacion(idhabitacion, tipohabitacion, descripcion, precio, imagenidimagen) VALUES (1, 'hfamiliar', '2 camas 2 baños estupendas vistas', 35000, 1)";
  registroHabitacion2: string = "INSERT or IGNORE INTO habitacion(idhabitacion, tipohabitacion, descripcion, precio, imagenidimagen) VALUES (2, 'hfamiliar', '2 camas 2 baños estupendas vistas', 35000, 1)";
  registroHabitacion3: string = "INSERT or IGNORE INTO habitacion(idhabitacion, tipohabitacion, descripcion, precio, imagenidimagen) VALUES (3, 'hsuite', '2 camas 2 baños estupendas vistas', 35000, 1)";
  registroHabitacion4: string = "INSERT or IGNORE INTO habitacion(idhabitacion, tipohabitacion, descripcion, precio, imagenidimagen) VALUES (4, 'hpresidencial', '2 camas 2 baños estupendas vistas', 35000, 1)";

  TablaImagen: string = "CREATE TABLE IF NOT EXISTS imagen(idimagen INTEGER PRIMARY KEY AUTOINCREMENT, urlimagen VARCHAR(500) NOT NULL)";
  registroImagen: string = "INSERT or IGNORE INTO imagen(idimagen, urlimagen) VALUES (1, 'http://imagen.com')";

  TablaContacto: string = "CREATE TABLE IF NOT EXISTS contacto(idcontacto INTEGER PRIMARY KEY AUTOINCREMENT, telefono INTEGER NOT NULL, nombre VARCHAR(60) NOT NULL, correousu VARCHAR(100) NOT NULL, mensaje VARCHAR(500) NOT NULL)";
  registroContacto: string = "INSERT or IGNORE INTO contacto(idcontacto, telefono, nombre, correousu, mensaje) VALUES (1, 983113301, 'andy madrid', 'madridpolanco@gmail.com', 'porfavor necesito un servicio')";

  listadoRol = new BehaviorSubject<Rol[]>([]);
  listadoUsuario = new BehaviorSubject<Usuario[]>([]);
  listadoReserva = new BehaviorSubject<Reserva[]>([]);
  listadoHabitacion = new BehaviorSubject<Habitacion[]>([]);
  listadoImagen = new BehaviorSubject<Imagen[]>([]);
  listadoContacto = new BehaviorSubject<Contacto[]>([]);

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

  // Métodos para manipular los observables
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
  fetchImagen(): Observable<Imagen[]> {
    return this.listadoImagen.asObservable();
  }
  fetchContacto(): Observable<Contacto[]> {
    return this.listadoContacto.asObservable();
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
        // Llamamos a la función para crear las tablas
        this.crearTablas();
      }).catch(e => {
        this.presentAlert('Base de Datos', 'Error en crear la BD: ' + JSON.stringify(e));
      });
    });
  }

  async crearTablas() {
    try {
      // Ejecuto la creación de Tablas
      await this.database.executeSql(this.TablaContacto, []);
      await this.database.executeSql(this.TablaHabitacion, []);
      await this.database.executeSql(this.TablaImagen, []);
      await this.database.executeSql(this.TablaReserva, []);
      await this.database.executeSql(this.TablaRol, []);
      await this.database.executeSql(this.TablaUsuario, []);

      // Ejecuto los insert por defecto en el caso que existan
      await this.database.executeSql(this.registroContacto, []);
      await this.database.executeSql(this.registroHabitacion, []);
      await this.database.executeSql(this.registroHabitacion2, []);
      await this.database.executeSql(this.registroHabitacion3, []);
      await this.database.executeSql(this.registroHabitacion4, []);
      await this.database.executeSql(this.registroImagen, []);
      await this.database.executeSql(this.registroReserva, []);
      await this.database.executeSql(this.registroRol, []);
      await this.database.executeSql(this.registroUsuario, []);

      this.seleccionarUsuarios();
      this.seleccionarHabitaciones();
      // Modifico el estado de la Base de Datos
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
