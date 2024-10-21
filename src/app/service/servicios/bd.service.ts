import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, identity, Observable } from 'rxjs';
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

  TablaUsuario: string = "CREATE TABLE IF NOT EXISTS usuario(idusuario INTEGER PRIMARY KEY AUTOINCREMENT, nombreusuario VARCHAR(100) NOT NULL, correo VARCHAR(100) NOT NULL, idrol INTEGER , rutusuario VARCHAR(15) NOT NULL, contrasena VARCHAR(20) NOT NULL, fechan VARCHAR(20) NOT NULL, telefono VARCHAR(30) NOT NULL,imagenp TEXT, FOREIGN KEY (idrol) REFERENCES rol(idrol));";
  registroUsuario: string = "INSERT or IGNORE INTO usuario (idusuario, nombreusuario, correo, rutusuario, contrasena, fechan, telefono,imagenp, idrol) VALUES (1, 'andy madrid', 'madridpolancoa@gmail.com', '21687221-5', 'Andymadrid12', '02/12/2004', '954341221','', 1);";

  TablaRol: string = "CREATE TABLE IF NOT EXISTS rol(idrol INTEGER PRIMARY KEY AUTOINCREMENT, nombrerol VARCHAR(50));"; 
  registrorol: string = "INSERT or IGNORE INTO rol (idrol, nombrerol) VALUES (1, 'admin');";

  TablaReserva: string = "CREATE TABLE IF NOT EXISTS reserva(idreserva INTEGER PRIMARY KEY AUTOINCREMENT, fecha DATE NOT NULL,noches INTEGER, total VARCHAR(50) NOT NULL, usuarioidusuario VARCHAR(200) NOT NULL,idhabitacion INTEGER, FOREIGN KEY (usuarioidusuario) REFERENCES usuario(idusuario), FOREIGN KEY (idhabitacion) REFERENCES habitacion(idhabitacion));";
  registroreserva: string = "INSERT or IGNORE INTO reserva (idreserva, fecha,noches, total, usuarioidusuario,idhabitacion) VALUES (1, '30/03/2024',3, '$20.000', 2,1);";

  TablaTipo: string = "CREATE TABLE IF NOT EXISTS tipo(idtipo INTEGER PRIMARY KEY, nombre VARCHAR(50) NOT NULL, imagen VARCHAR(100) NOT NULL, precio VARCHAR(50) NOT NULL, descripcion VARCHAR(200) NOT NULL);";
  registrotipo: string = "INSERT or IGNORE INTO tipo (idtipo, nombre, imagen, precio, descripcion) VALUES (1, 'Habitacion Familiar', 'assets/familiar/familiar.3.jpg', '$20.000', 'Habitación acogedora con varias camas, ideal para familias. Ofrece TV, iluminación suave y decoración sencilla.');";
  registrotipo2: string = "INSERT or IGNORE INTO tipo (idtipo, nombre, imagen, precio, descripcion) VALUES (2, 'Suite Presidencial', 'assets/precidencial/precidencial1.jpg', '$60.000', 'Espacio lujoso con vistas panorámicas, chimenea, cama king size y diseño moderno. Perfecta para una experiencia exclusiva. ');";
  registrotipo3: string = "INSERT or IGNORE INTO tipo (idtipo, nombre, imagen, precio, descripcion) VALUES (3, 'Habitacion Suite', 'assets/suite/suite4.webp', '$40.000', 'Suite moderna y lujosa con cama amplia, cabecero acolchado, tonos azul suave y muebles minimalistas. Grandes ventanales ofrecen luz natural, creando un ambiente acogedor y sofisticado ');";




  TablaDetalle: string = "CREATE TABLE IF NOT EXISTS detalle(iddetalle INTEGER PRIMARY KEY AUTOINCREMENT, idreserva INTEGER NOT NULL, habitacionidhabitacion INTEGER NOT NULL, cantidad INTEGER NOT NULL, finicio VARCHAR(50) NOT NULL, subtotal VARCHAR(50) NOT NULL, FOREIGN KEY (idreserva) REFERENCES reserva(idreserva), FOREIGN KEY (habitacionidhabitacion) REFERENCES habitacion(idhabitacion));";
  registrodetalle: string = "INSERT or IGNORE INTO detalle (iddetalle, idreserva, habitacionidhabitacion, cantidad, finicio, subtotal) VALUES (1, 2, 3, 4, '10/04/2024', '$54.000');";

  TablaHabitacion: string = "CREATE TABLE IF NOT EXISTS habitacion(idhabitacion INTEGER PRIMARY KEY AUTOINCREMENT, tipoidtipo INTEGER NOT NULL, estadoidestado INTEGER, FOREIGN KEY (tipoidtipo) REFERENCES tipo(idtipo));";
  registrohabitacion1: string = "INSERT or IGNORE INTO habitacion (idhabitacion, tipoidtipo) VALUES (1, 1);";
  registrohabitacion2: string = "INSERT or IGNORE INTO habitacion (idhabitacion, tipoidtipo) VALUES (2, 3);";
  registrohabitacion3: string = "INSERT or IGNORE INTO habitacion (idhabitacion, tipoidtipo) VALUES (3, 2);";
  registrohabitacion4: string = "INSERT or IGNORE INTO habitacion (idhabitacion, tipoidtipo) VALUES (4, 2);";



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


      await this.database.executeSql(this.registroUsuario, []);
      await this.database.executeSql(this.registrorol,[]);
      await this.database.executeSql(this.registroreserva,[]);
      await this.database.executeSql(this.registrotipo,[]);
      await this.database.executeSql(this.registrotipo2,[]);
      await this.database.executeSql(this.registrotipo3,[]);
      await this.database.executeSql(this.registrodetalle,[]); 
      await this.database.executeSql(this.registrohabitacion1,[]);
      await this.database.executeSql(this.registrohabitacion2,[]);
      await this.database.executeSql(this.registrohabitacion3,[]);
      await this.database.executeSql(this.registrohabitacion4,[]);


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
    return this.database.executeSql('SELECT idusuario, nombreusuario, correo, rutusuario, contrasena, fechan, telefono, idrol FROM usuario', []).then(res => {
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
  

  //idusuario, nombreusuario, correo, rutusuario, contrasena, fechan, telefono, idrol
  ModificarUsuario(idusuario: string, nombreusuario: string, correo: string,contrasena: string, telefono: string,imagenp: string)  {{
    return this.database.executeSql('UPDATE usuario SET idusuario = ?,nombreusuario =?, correo =?,contrasena =?, telefono =?, imagenp = ? WHERE idusuario =?', []).then(res => {
      this.presentAlert("Modificar", "USUARIO MODIFICADO");
      this.seleccionarUsuarios(); // Actualiza la lista de usuarios después de
    });
  }
}
BuscarUsu(idusuario: number){
    return this.database.executeSql('SELECT idusuario ,nombreusuario, correo ,rutusuario, telefono, imagenp FROM usuario WHERE idusuario = ?', [idusuario]).then(res =>{
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
  BuscarUsuC(correo: string){
    return this.database.executeSql('SELECT idusuario ,nombreusuario, correo ,rutusuario, telefono, imagenp FROM usuario WHERE correo = ?', [correo]).then(res =>{
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

  ListarReservas() {
    const query = 'SELECT r.idreserva, r.fecha, r.total, r.usuarioidusuario, u.nombreusuario FROM reserva r INNER JOIN usuario u ON r.usuarioidusuario = u.idusuario';
    return this.database.executeSql(query, []).then(res => {
      let items: any[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            idreserva: res.rows.item(i).idreserva,
            fecha: res.rows.item(i).fecha,
            total: res.rows.item(i).total,
            usuarioidusuario: res.rows.item(i).usuarioidusuario,
            nombreusuario: res.rows.item(i).nombreusuario 
          });
        }
      }
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
    return this.database.executeSql('SELECT h.idhabitacion, t.nombre FROM habitacion h INNER JOIN tipo t ON h.tipoidtipo = t.idtipo ', []).then(res => {
      // Variable para almacenar el resultado de la consulta
      let items: Habitacion[] = [];
      // Valido si trae al menos un registro
      if (res.rows.length > 0) {
        // Recorro mi resultado
        for (var i = 0; i < res.rows.length; i++) {
          // Agrego los registros a mi lista
          items.push({
            idhabitacion: res.rows.item(i).idhabitacion,
            nombre: res.rows.item(i).nombre

          });
        }
      }
      // Actualizar el observable
      this.listadoHabitacion.next(items as any);
    });
  }

  ReservaPorUsuario(idusuario: string) {
    return this.database.executeSql('SELECT r.idreserva, r.fecha, r.total, r.usuarioidusuario, r.idhabitacion, u.nombreusuario AS nombreusuario FROM reserva r JOIN usuario u ON r.usuarioidusuario = u.idusuario WHERE r.usuarioidusuario = ?', [idusuario]).then(res => {
        let reservas: any[] = [];
        for (let i = 0; i < res.rows.length; i++) {
          reservas.push(res.rows.item(i));
        }
        return reservas;
      })
      .catch(e => {
        this.presentAlert('Usuario', 'Error: ' + JSON.stringify(e));
        return [];
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
  insertahabi(tipoidtipo: number){
    return this.database.executeSql('INSERT INTO habitacion(tipoidtipo) VALUES (?)',[tipoidtipo]).then(res=>{
      this.presentAlert("Insertar","Habitacion Registrada");
      this.seleccionarHabitaciones();
    }).catch(e=>{
      this.presentAlert('Insertar', 'Error: ' + JSON.stringify(e));
    })
  }

  ListarHabi() {
    return this.database.executeSql('SELECT h.idhabitacion, t.idtipo, t.nombre, t.imagen, t.precio, t.descripcion FROM habitacion h INNER JOIN tipo t ON h.tipoidtipo = t.idtipo WHERE t.idtipo = ?', ['1']).then(res => {
      // Variable para almacenar el resultado de la consulta
      let items: Habitacion[] = [];
      // Valido si trae al menos un registro
      if (res.rows.length > 0) {
        // Recorro mi resultado
        for (let i = 0; i < res.rows.length; i++) {
          // Agrego los registros a mi lista
          items.push({
            idhabitacion : res.rows.item(i).idhabitacion,
            idtipo: res.rows.item(i).idtipo,
            nombre: res.rows.item(i).nombre,
            imagen: res.rows.item(i).imagen,
            precio: res.rows.item(i).precio,
            descripcion: res.rows.item(i).descripcion
          });
        }
      }
      // Actualizar el observable
      this.listadoHabitacion.next(items as any);
    });
  }


  ListarHabip() {
    return this.database.executeSql('SELECT h.idhabitacion, t.idtipo, t.nombre, t.imagen, t.precio, t.descripcion FROM habitacion h INNER JOIN tipo t ON h.tipoidtipo = t.idtipo WHERE t.idtipo = ?', ['2']).then(res => {
      // Variable para almacenar el resultado de la consulta
      let items: Habitacion[] = [];
      // Valido si trae al menos un registro
      if (res.rows.length > 0) {
        // Recorro mi resultado
        for (let i = 0; i < res.rows.length; i++) {
          // Agrego los registros a mi lista
          items.push({
            idhabitacion : res.rows.item(i).idhabitacion,
            idtipo: res.rows.item(i).idtipo,
            nombre: res.rows.item(i).nombre,
            imagen: res.rows.item(i).imagen,
            precio: res.rows.item(i).precio,
            descripcion: res.rows.item(i).descripcion
          });
        }
      }
      // Actualizar el observable
      this.listadoHabitacion.next(items as any);
    });
  }

  
  ListarHabis() {
    return this.database.executeSql('SELECT h.idhabitacion, t.idtipo, t.nombre, t.imagen, t.precio, t.descripcion FROM habitacion h INNER JOIN tipo t ON h.tipoidtipo = t.idtipo WHERE t.idtipo = ?', ['3']).then(res => {
      // Variable para almacenar el resultado de la consulta
      let items: Habitacion[] = [];
      // Valido si trae al menos un registro
      if (res.rows.length > 0) {
        // Recorro mi resultado
        for (let i = 0; i < res.rows.length; i++) {
          // Agrego los registros a mi lista
          items.push({
            idhabitacion : res.rows.item(i).idhabitacion,
            idtipo: res.rows.item(i).idtipo,
            nombre: res.rows.item(i).nombre,
            imagen: res.rows.item(i).imagen,
            precio: res.rows.item(i).precio,
            descripcion: res.rows.item(i).descripcion
          });
        }
      }
      // Actualizar el observable
      this.listadoHabitacion.next(items as any);
    });
  }



  insertarUsuario(nombreusuario: string, rutusuario: string, correo: string, contrasena: string, fechan: string, telefono: string, imagenp: string, idrol: string) {
    if (!this.validarEdad(fechan)) {
      this.presentAlert("Error", "Debes ser mayor de 18 años para registrarte.");
      return; 
    }
      return this.database.executeSql('INSERT INTO usuario(nombreusuario, correo, rutusuario, contrasena, fechan, telefono, imagenp, idrol) VALUES (?,?,?,?,?,?,?,?)', 
      [nombreusuario, correo, rutusuario, contrasena, fechan, telefono, imagenp, idrol])
      .then(res => {
        this.presentAlert("Insertar", "Usuario Registrado");
        this.seleccionarUsuarios();
      })
      .catch(e => {
        this.presentAlert('Insertar', 'Error: ' + JSON.stringify(e));
      });
  }
  
  validarEdad(fecha: string): boolean {
    const fechaNacimiento = new Date(fecha);
    const edad = new Date().getFullYear() - fechaNacimiento.getFullYear();
    return edad > 18 || (edad === 18 && new Date().getTime() >= fechaNacimiento.getTime());
  }

  //RESERVA
  insertarReserva(fecha: string,noches:number ,total:string,usuarioidusuario:string,idhabitacion: number){
    return this.database.executeSql('INSERT INTO reserva(fecha,noches,total,usuarioidusuario,idhabitacion) VALUES (?,?,?,?,?)',[fecha,noches,total,usuarioidusuario,idhabitacion]).then(res=>{
      this.presentAlert("Reserva Registrada","Gracias por reservar con nosotros");
      this.ListarReservas();
    }).catch(e=>{
      this.presentAlert('Insertar', 'Error: ' + JSON.stringify(e)); 
    })
  }
  insertarReservas(fecha: string,noches:number ,total:string,usuarioidusuario:string, idhabitacion: number){
    return this.database.executeSql('INSERT INTO reserva(fecha,noches,total,usuarioidusuario,idhabitacion) VALUES (?,?,?,?,?)',[fecha,noches,total,usuarioidusuario,idhabitacion]).then(res=>{
      this.presentAlert("Reserva Registrada","Gracias por reservar con nosotros");
      this.ListarReservas();
    }).catch(e=>{
      this.presentAlert('Insertar', 'Error: ' + JSON.stringify(e));
    })
  }

  insertarReservap(fecha: string,noches:number ,total:string,usuarioidusuario:string,idhabitacion: number){
    return this.database.executeSql('INSERT INTO reserva(fecha,noches,total,usuarioidusuario,idhabitacion) VALUES (?,?,?,?,?)',[fecha,noches,total,usuarioidusuario,idhabitacion]).then(res=>{
      this.presentAlert("Reserva Registrada","Gracias por reservar con nosotros");
      this.ListarReservas();
    }).catch(e=>{
      this.presentAlert('Insertar', 'Error: ' + JSON.stringify(e));
    })
  }

  eliminarReserva(idreserva: string) {
    return this.database.executeSql('DELETE FROM reserva WHERE idreserva = ?', [idreserva]).then(res => {
      this.presentAlert("Eliminar", "RESERVA ELIMINADA");
      this.ListarReservas(); // Asegúrate de que este método recarga la lista de reservas
    }).catch(e => {
      this.presentAlert('Eliminar', 'Error: ' + JSON.stringify(e));
    });
  }
  

  modificarReserva(idreserva: number, fecha: string , noches :number) {
    return this.database.executeSql('UPDATE reserva SET fecha = ? , noches = ? WHERE idreserva = ?', [fecha,noches,idreserva])
      .then(res => {
        return res;
      })
      .catch(e => {
        this.presentAlert('Modificar', 'Error: ' + JSON.stringify(e));
      });
  }
  

  modificarContra(contrasena: string, idusuario: number){
    return this.database.executeSql(
      'UPDATE usuario SET contrasena = ? WHERE idusuario = ?',
      [contrasena, idusuario] 
    ).then(res => {
      this.seleccionarUsuarios();
    }).catch(e => {
      this.presentAlert('Modificar', 'Error: ' + JSON.stringify(e));
    });
  }

  llamarid(idhabitacion: number){
    return this.database.executeSql('SELECT idhabitacion FROM habitacion WHERE idhabitacion = ?', [idhabitacion]).then(res => {
    });
  }


  getReservasPorHabitacion(idhabitacion: number) {
    const query = "SELECT fecha, noches FROM reserva WHERE idhabitacion = ?";
    return this.database.executeSql(query, [idhabitacion]).then((data) => {
      let reservas = [];
      for (let i = 0; i < data.rows.length; i++) {
        // Asegúrate de convertir la fecha en un objeto Date
        const reserva = {
          fecha: new Date(data.rows.item(i).fecha), // Convertimos la fecha a un objeto Date
          noches: data.rows.item(i).noches
        };
        reservas.push(reserva);
      }
      return reservas;
    });
  }
  

  eliminarHabi(idhabitacion: string) {
    return this.database.executeSql('DELETE FROM habitacion WHERE idhabitacion = ?', [idhabitacion]).then(res => {
      this.presentAlert("Eliminar", "Habitacion ELIMINADA");
      this.ListarReservas(); // Asegúrate de que este método recarga la lista de reservas
    }).catch(e => {
      this.presentAlert('Eliminar', 'Error: ' + JSON.stringify(e));
    });
  }

  
  
}