import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Rol } from './rol';
import { Usuario } from './usuario';
import { Reserva } from './reserva';
import { Habitacion } from './habitacion';
import { Estado } from './estado';
import { Tipo } from './tipo';
import { Detalle } from './detalle';
import { Imagen } from './imagen';

@Injectable({
  providedIn: 'root'
})
export class BdService {
  public database!: SQLiteObject;

  TablaUsuario: string = "CREATE TABLE IF NOT EXISTS usuario(idusuario INTEGER PRIMARY KEY AUTOINCREMENT, nombreusuario VARCHAR(100) NOT NULL, correo VARCHAR(100) NOT NULL, idrol INTEGER , rutusuario VARCHAR(15) NOT NULL, contrasena VARCHAR(20) NOT NULL, fechan VARCHAR(20) NOT NULL, telefono VARCHAR(30) NOT NULL, FOREIGN KEY (idrol) REFERENCES rol(idrol));";
  registroUsuario: string = "INSERT or IGNORE INTO usuario (idusuario, nombreusuario, correo, rutusuario, contrasena, fechan, telefono, idrol) VALUES (1, 'andy madrid', 'madridpolancoa@gmail.com', '21687221-5', 'Andymadrid12', '02/12/2004', '954341221', 1);";

  TablaRol: string = "CREATE TABLE IF NOT EXISTS rol(idrol INTEGER PRIMARY KEY AUTOINCREMENT, nombrerol VARCHAR(50));"; 
  registrorol: string = "INSERT or IGNORE INTO rol (idrol, nombrerol) VALUES (1, 'admin');";

  TablaReserva: string = "CREATE TABLE IF NOT EXISTS reserva(idreserva INTEGER PRIMARY KEY AUTOINCREMENT, fecha VARCHAR(50) NOT NULL, total VARCHAR(50) NOT NULL, usuarioidusuario VARCHAR(200) NOT NULL, FOREIGN KEY (usuarioidusuario) REFERENCES usuario(idusuario));";
  registroreserva: string = "INSERT or IGNORE INTO reserva (idreserva, fecha, total, usuarioidusuario) VALUES (1, '30/03/2024', '$14.000', 2);";

  TablaTipo: string = "CREATE TABLE IF NOT EXISTS tipo(idtipo INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(50) NOT NULL, imagen VARCHAR(100) NOT NULL, precio VARCHAR(50) NOT NULL, descripcion VARCHAR(200) NOT NULL);";
  registrotipo: string = "INSERT or IGNORE INTO tipo (idtipo, nombre, imagen, precio, descripcion) VALUES (1, 'Habitacion Familiar', 'assets/familiar/familiar.3.jpg', '$20.000', 'Habitación acogedora con varias camas, ideal para familias. Ofrece TV, iluminación suave y decoración sencilla.');";
  registrotipo2: string = "INSERT or IGNORE INTO tipo (idtipo, nombre, imagen, precio, descripcion) VALUES (2, 'Habitacion Familiar', 'assets/familiar/familiar.3.jpg', '$20.000', 'Habitación acogedora con varias camas, ideal para familias. Ofrece TV, iluminación suave y decoración sencilla.');";
  registrotipo3: string = "INSERT or IGNORE INTO tipo (idtipo, nombre, imagen, precio, descripcion) VALUES (3, 'Habitacion Familiar', 'assets/familiar/familiar.3.jpg', '$20.000', 'Habitación acogedora con varias camas, ideal para familias. Ofrece TV, iluminación suave y decoración sencilla.');";
  registrotipo4: string = "INSERT or IGNORE INTO tipo (idtipo, nombre, imagen, precio, descripcion) VALUES (4, 'Habitacion Familiar', 'assets/familiar/familiar.3.jpg', '$20.000', 'Habitación acogedora con varias camas, ideal para familias. Ofrece TV, iluminación suave y decoración sencilla.');";
  registrotipo5: string = "INSERT or IGNORE INTO tipo (idtipo, nombre, imagen, precio, descripcion) VALUES (5, 'Suite Presidencial', 'assets/precidencial/precidencial1.jpg', '$60.000', 'Espacio lujoso con vistas panorámicas, chimenea, cama king size y diseño moderno. Perfecta para una experiencia exclusiva. ');";
  registrotipo6: string = "INSERT or IGNORE INTO tipo (idtipo, nombre, imagen, precio, descripcion) VALUES (6, 'Suite Presidencial', 'assets/precidencial/precidencial1.jpg', '$60.000', 'Espacio lujoso con vistas panorámicas, chimenea, cama king size y diseño moderno. Perfecta para una experiencia exclusiva.');";
  registrotipo7: string = "INSERT or IGNORE INTO tipo (idtipo, nombre, imagen, precio, descripcion) VALUES (7, 'Suite Presidencial', 'assets/precidencial/precidencial1.jpg', '$60.000', 'Espacio lujoso con vistas panorámicas, chimenea, cama king size y diseño moderno. Perfecta para una experiencia exclusiva.');";
  registrotipo8: string = "INSERT or IGNORE INTO tipo (idtipo, nombre, imagen, precio, descripcion) VALUES (8, 'Suite Presidencial', 'assets/precidencial/precidencial1.jpg', '$60.000', 'Espacio lujoso con vistas panorámicas, chimenea, cama king size y diseño moderno. Perfecta para una experiencia exclusiva.');";
  registrotipo9: string = "INSERT or IGNORE INTO tipo (idtipo, nombre, imagen, precio, descripcion) VALUES (9, 'Habitacion Suite', 'assets/suite/suite4.webp', '$40.000', 'Suite moderna y lujosa con cama amplia, cabecero acolchado, tonos azul suave y muebles minimalistas. Grandes ventanales ofrecen luz natural, creando un ambiente acogedor y sofisticado ');";
  registrotipo10: string = "INSERT or IGNORE INTO tipo (idtipo, nombre, imagen, precio, descripcion) VALUES (10, 'Habitacion Suite', 'assets/suite/suite4.webp', '$40.000', 'Suite moderna y lujosa con cama amplia, cabecero acolchado, tonos azul suave y muebles minimalistas. Grandes ventanales ofrecen luz natural, creando un ambiente acogedor y sofisticado');";
  registrotipo11: string = "INSERT or IGNORE INTO tipo (idtipo, nombre, imagen, precio, descripcion) VALUES (11, 'Habitacion Suite', 'assets/suite/suite4.webp', '$40.000', 'Suite moderna y lujosa con cama amplia, cabecero acolchado, tonos azul suave y muebles minimalistas. Grandes ventanales ofrecen luz natural, creando un ambiente acogedor y sofisticado');";
  registrotipo12: string = "INSERT or IGNORE INTO tipo (idtipo, nombre, imagen, precio, descripcion) VALUES (12, 'Habitacion Suite', 'assets/suite/suite4.webp', '$40.000', 'Suite moderna y lujosa con cama amplia, cabecero acolchado, tonos azul suave y muebles minimalistas. Grandes ventanales ofrecen luz natural, creando un ambiente acogedor y sofisticado');";



  TablaDetalle: string = "CREATE TABLE IF NOT EXISTS detalle(iddetalle INTEGER PRIMARY KEY AUTOINCREMENT, idreserva INTEGER NOT NULL, habitacionidhabitacion INTEGER NOT NULL, cantidad INTEGER NOT NULL, finicio VARCHAR(50) NOT NULL, subtotal VARCHAR(50) NOT NULL, FOREIGN KEY (idreserva) REFERENCES reserva(idreserva), FOREIGN KEY (habitacionidhabitacion) REFERENCES habitacion(idhabitacion));";
  registrodetalle: string = "INSERT or IGNORE INTO detalle (iddetalle, idreserva, habitacionidhabitacion, cantidad, finicio, subtotal) VALUES (1, 2, 3, 4, '10/04/2024', '$54.000');";

  TablaHabitacion: string = "CREATE TABLE IF NOT EXISTS habitacion(idhabitacion INTEGER PRIMARY KEY, tipoidtipo INTEGER NOT NULL, nombreh VARCHAR(50) NOT NULL, estadoidestado INTEGER NOT NULL, FOREIGN KEY (tipoidtipo) REFERENCES tipo(idtipo), FOREIGN KEY (estadoidestado) REFERENCES estado(idestado));";
  registrohabitacion1: string = "INSERT or IGNORE INTO habitacion (idhabitacion, tipoidtipo, nombreh, estadoidestado) VALUES (1, 1, 'familiar', 1);";
  registrohabitacion2: string = "INSERT or IGNORE INTO habitacion (idhabitacion, tipoidtipo, nombreh, estadoidestado) VALUES (2, 2, 'suite', 2);";
  registrohabitacion3: string = "INSERT or IGNORE INTO habitacion (idhabitacion, tipoidtipo, nombreh, estadoidestado) VALUES (3, 3, 'presidencial', 3);";
  registrohabitacion4: string = "INSERT or IGNORE INTO habitacion (idhabitacion, tipoidtipo, nombreh, estadoidestado) VALUES (4, 4, 'presidencial',4);";

  TablaEstado: string = "CREATE TABLE IF NOT EXISTS estado(idestado INTEGER PRIMARY KEY, nombre VARCHAR(50) NOT NULL);";
  registroestado: string = "INSERT or IGNORE INTO estado (idestado, nombre) VALUES (1, 'disponible');";


  listadoRol = new BehaviorSubject([]);
  listadoUsuario = new BehaviorSubject([]);
  listadoReserva = new BehaviorSubject([]);
  listadoHabitacion = new BehaviorSubject([]);
  listadoEstado = new BehaviorSubject([]);
  listadoTipo = new BehaviorSubject([]);
  listadoDetalle = new BehaviorSubject([]);

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
        // Llamamos a la función para crear las tablas
        this.crearTablas(); // Llama a crearTablas directamente
      }).catch(e => {
        this.presentAlert('Base de Datos', 'Error en crear la BD: ' + JSON.stringify(e));
      });
    });
  }
  

  async crearTablas() {
    try {

      await this.database.executeSql(this.TablaUsuario, []);
      await this.database.executeSql(this.TablaRol,[]);
      await this.database.executeSql(this.TablaReserva,[]);
      await this.database.executeSql(this.TablaTipo,[]);
      await this.database.executeSql(this.TablaDetalle,[]); 
      await this.database.executeSql(this.TablaHabitacion,[]);
      await this.database.executeSql(this.TablaEstado,[]);

      await this.database.executeSql(this.registroUsuario, []);
      await this.database.executeSql(this.registrorol,[]);
      await this.database.executeSql(this.registroreserva,[]);
      await this.database.executeSql(this.registrotipo,[]);
      await this.database.executeSql(this.registrotipo2,[]);
      await this.database.executeSql(this.registrotipo3,[]);
      await this.database.executeSql(this.registrotipo4,[]);
      await this.database.executeSql(this.registrotipo5,[]);
      await this.database.executeSql(this.registrotipo6,[]);
      await this.database.executeSql(this.registrotipo7,[]);
      await this.database.executeSql(this.registrotipo8,[]);
      await this.database.executeSql(this.registrotipo9,[]);
      await this.database.executeSql(this.registrotipo10,[]);
      await this.database.executeSql(this.registrotipo11,[]);
      await this.database.executeSql(this.registrotipo12,[]);
      await this.database.executeSql(this.registrodetalle,[]); 
      await this.database.executeSql(this.registrohabitacion1,[]);
      await this.database.executeSql(this.registrohabitacion2,[]);
      await this.database.executeSql(this.registrohabitacion3,[]);
      await this.database.executeSql(this.registrohabitacion4,[]);
      await this.database.executeSql(this.registroestado,[]);

      this.seleccionarHabitaciones();
      this.seleccionarUsuarios();
      this.ListarHabi();
      this.ListarReservas();
      this.ListarHabip();
      this.ListarHabis();
      
      this.isDBReady.next(true);
    } catch (e) {
      this.presentAlert('Creación de Tablas', 'Error en crear las tablas: ' + JSON.stringify(e));
    }
  }
  //ADMINISTRADOR

  seleccionarUsuarios() {
    return this.database.executeSql('SELECT * FROM usuario', []).then(res => {
      // Variable para almacenar el resultado de la consulta
      let items: Usuario[] = [];
      // Valido si trae al menos un registro
      if (res.rows.length > 0) {
        // Recorro mi resultado
        for (var i = 0; i < res.rows.length; i++) {
          // Agrego los registros a mi lista
          items.push({//idusuario, nombreusuario, correo, rutusuario, contrasena, fechan, telefono, idrol
            idusuario: res.rows.item(i).idusuario,
            nombreusuario: res.rows.item(i).nombreusuario,
            rutusuario: res.rows.item(i).rutusuario,
            correo: res.rows.item(i).correo,
            telefono: res.rows.item(i).telefono

          });
        }
      }
      // Actualizar el observable
      this.listadoUsuario.next(items as any);
    });
  }

  ListarReservas(){ 
    return this.database.executeSql('SELECT idreserva, fecha, total,usuarioidusuario FROM reserva', []).then(res => {
    // Variable para almacenar el resultado de la consulta
    let items: Reserva[] = [];
    // Valido si trae al menos un registro
    if (res.rows.length > 0) {
      // Recorro mi resultado
      for (var i = 0; i < res.rows.length; i++) {
        // Agrego los registros a mi lista idreserva, fecha, total, usuarioidusuario
        items.push({
          idreserva: res.rows.item(i).idreserva,
          fecha: res.rows.item(i).fecha,
          total: res.rows.item(i).total,
          usuarioidusuario: res.rows.item(i).usuarioidusuario
        });
      }
    }
    // Actualizar el observable
    this.listadoReserva.next(items as any);
  });

  }

  eliminarUsuario(idusuario: string) {
    return this.database.executeSql('DELETE FROM usuario WHERE idusuario = ?', [idusuario]).then(res => {
      this.presentAlert("Eliminar", "USUARIO ELIMINADO");
      this.seleccionarUsuarios(); // Actualiza la lista de usuarios después de eliminar
    }).catch(e => {
      this.presentAlert('Eliminar', 'Error: ' + JSON.stringify(e));
    });
  }
  //HABITACIONES
  seleccionarHabitaciones() {
    return this.database.executeSql('SELECT COUNT(h.idhabitacion) AS cantidad, t.nombre AS tipohabitacion FROM habitacion h INNER JOIN tipo t ON h.tipoidtipo = t.idtipo GROUP BY t.nombre', []).then(res => {
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

    Login(correo: string, contrasena: string){
      return this.database.executeSql('SELECT * FROM usuario WHERE correo = ? AND contrasena = ?', [correo,contrasena]

      ).then(res =>{
        if (res.rows.length > 0) {
          return res.rows.item(0);

        }else {
          return null;

        } 


      }).catch(e =>{
        this.presentAlert('Usuario', 'Error: ' + JSON.stringify(e));
        return null;

      });

    }

  ListarHabi() {
    return this.database.executeSql('SELECT idtipo, nombre, imagen, precio, descripcion FROM tipo WHERE precio = ?', ['$20.000']).then(res => {
      // Variable para almacenar el resultado de la consulta
      let items: Tipo[] = [];
      // Valido si trae al menos un registro
      if (res.rows.length > 0) {
        // Recorro mi resultado
        for (let i = 0; i < res.rows.length; i++) {
          // Agrego los registros a mi lista
          items.push({
            idtipo: res.rows.item(i).idtipo,
            nombre: res.rows.item(i).nombre,
            imagen: res.rows.item(i).imagen,
            precio: res.rows.item(i).precio,
            descripcion: res.rows.item(i).descripcion
          });
        }
      }
      // Actualizar el observable
      this.listadoTipo.next(items as any);
    });
  }
  

  ListarHabip() {
    return this.database.executeSql('SELECT idtipo, nombre, imagen, precio, descripcion FROM tipo WHERE precio = ?', ['$60.000']).then(res => {
      // Variable para almacenar el resultado de la consulta
      let items: Tipo[] = [];
      // Valido si trae al menos un registro
      if (res.rows.length > 0) {
        // Recorro mi resultado
        for (let i = 0; i < res.rows.length; i++) {
          // Agrego los registros a mi lista
          items.push({
            idtipo: res.rows.item(i).idtipo,
            nombre: res.rows.item(i).nombre,
            imagen: res.rows.item(i).imagen,
            precio: res.rows.item(i).precio,
            descripcion: res.rows.item(i).descripcion
          });
        }
      }
      // Actualizar el observable
      this.listadoTipo.next(items as any);
    });
  }
  
  ListarHabis() {
    return this.database.executeSql('SELECT idtipo, nombre, imagen, precio, descripcion FROM tipo WHERE precio = ?', ['$40.000']).then(res => {
      // Variable para almacenar el resultado de la consulta
      let items: Tipo[] = [];
      // Valido si trae al menos un registro
      if (res.rows.length > 0) {
        // Recorro mi resultado
        for (let i = 0; i < res.rows.length; i++) {
          // Agrego los registros a mi lista
          items.push({
            idtipo: res.rows.item(i).idtipo,
            nombre: res.rows.item(i).nombre,
            imagen: res.rows.item(i).imagen,
            precio: res.rows.item(i).precio,
            descripcion: res.rows.item(i).descripcion
          });
        }
      }
      // Actualizar el observable
      this.listadoTipo.next(items as any);
    });
  }



insertarUsuario(nombreusuario: string,rutusuario: string , correo: string, contrasena: string, fechan: string, telefono: string, idrol: string){
  return this.database.executeSql('INSERT INTO usuario(nombreusuario, correo, rutusuario, contrasena, fechan, telefono, idrol) VALUES (?,?,?,?,?,?,?)',[nombreusuario, correo, rutusuario, contrasena, fechan, telefono,idrol]).then(res=>{
    this.presentAlert("Insertar","Usuario Registrado");
    this.seleccionarUsuarios();
  }).catch(e=>{
    this.presentAlert('Insertar', 'Error: ' + JSON.stringify(e));
  })
}

  //RESERVA
  insertarReserva(fecha: string,total:string,usuarioidusuario:string){
    return this.database.executeSql('INSERT INTO reserva(fecha,total,usuarioidusuario) VALUES (?,?,?)',[fecha,total,usuarioidusuario]).then(res=>{
      this.presentAlert("Insertar","Reserva Registrada");
      this.ListarReservas();
    }).catch(e=>{
      this.presentAlert('Insertar', 'Error: ' + JSON.stringify(e));
    })
  }
  insertarReservas(fecha: string,total:string,usuarioidusuario:string){
    return this.database.executeSql('INSERT INTO reserva(fecha,total,usuarioidusuario) VALUES (?,?,?)',[fecha,total,usuarioidusuario]).then(res=>{
      this.presentAlert("Insertar","Reserva Registrada");
      this.ListarReservas();
    }).catch(e=>{
      this.presentAlert('Insertar', 'Error: ' + JSON.stringify(e));
    })
  }
  insertarReservap(fecha: string,total:string,usuarioidusuario:string){
    return this.database.executeSql('INSERT INTO reserva(fecha,total,usuarioidusuario) VALUES (?,?,?)',[fecha,total,usuarioidusuario]).then(res=>{
      this.presentAlert("Insertar","Reserva Registrada");
      this.ListarReservas();
    }).catch(e=>{
      this.presentAlert('Insertar', 'Error: ' + JSON.stringify(e));
    })
  }
}