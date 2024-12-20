import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, from, identity, map, Observable, tap } from 'rxjs';
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

  TablaUsuario: string = "CREATE TABLE IF NOT EXISTS usuario(idusuario INTEGER PRIMARY KEY AUTOINCREMENT, nombreusuario VARCHAR(100) NOT NULL, correo VARCHAR(100) NOT NULL, rutusuario VARCHAR(15) NOT NULL, contrasena VARCHAR(20) NOT NULL, fechan VARCHAR(20) NOT NULL, telefono VARCHAR(30) NOT NULL,imagenp TEXT,rolidrol VARCHAR(30), estadoidestado INTEGER, FOREIGN KEY (rolidrol) REFERENCES rol(idrol),FOREIGN KEY (estadoidestado) REFERENCES estado(idestado));";
  registroUsuario: string = "INSERT or IGNORE INTO usuario (idusuario, nombreusuario, correo, rutusuario, contrasena, fechan, telefono,imagenp, rolidrol,estadoidestado) VALUES (1, 'andy madrid', 'madridpolancoa@gmail.com', '21687221-5', 'Andymadrid12', '02/12/2004', '954341221','', '1',1);";
  registroAdmin: string = "INSERT or IGNORE INTO usuario (idusuario, nombreusuario,correo, rutusuario,contrasena, fechan, telefono, imagenp, rolidrol,estadoidestado) VALUES (2, 'admin', 'admin@gmail.com','12345678-0', 'Admin123','02/09/2000','987654321','', '2',1);";


  TablaRol: string = "CREATE TABLE IF NOT EXISTS rol(idrol VARCHAR(30) PRIMARY KEY, nombrerol VARCHAR(50));";
  registrorol: string = "INSERT or IGNORE INTO rol (idrol, nombrerol) VALUES ('1', 'usuario');";
  registrorol2: string = "INSERT OR IGNORE INTO rol (idrol, nombrerol) VALUES ('2', 'admin');";

  TablaReserva: string = "CREATE TABLE IF NOT EXISTS reserva(idreserva INTEGER PRIMARY KEY AUTOINCREMENT, fecha DATE NOT NULL,noches INTEGER, total VARCHAR(50) NOT NULL,motivo VARCHAR(500), usuarioidusuario VARCHAR(200) NOT NULL,idhabitacion INTEGER,estadoidestado INTEGER, FOREIGN KEY (usuarioidusuario) REFERENCES usuario(idusuario), FOREIGN KEY (idhabitacion) REFERENCES habitacion(idhabitacion),FOREIGN KEY (estadoidestado) REFERENCES estado(idestado) );";

  TablaTipo: string = "CREATE TABLE IF NOT EXISTS tipo(idtipo INTEGER PRIMARY KEY, nombre VARCHAR(50) NOT NULL, imagen VARCHAR(100) NOT NULL, precio VARCHAR(50) NOT NULL, descripcion VARCHAR(200) NOT NULL);";
  registrotipo: string = "INSERT or IGNORE INTO tipo (idtipo, nombre, imagen, precio, descripcion) VALUES (1, 'Habitacion Familiar', 'assets/familiar/familiar.3.jpg', '$20.000', 'Habitación acogedora con varias camas, ideal para familias. Ofrece TV, iluminación suave y decoración sencilla.');";
  registrotipo2: string = "INSERT or IGNORE INTO tipo (idtipo, nombre, imagen, precio, descripcion) VALUES (2, 'Suite Presidencial', 'assets/precidencial/precidencial1.jpg', '$60.000', 'Espacio lujoso con vistas panorámicas, chimenea, cama king size y diseño moderno. Perfecta para una experiencia exclusiva. ');";
  registrotipo3: string = "INSERT or IGNORE INTO tipo (idtipo, nombre, imagen, precio, descripcion) VALUES (3, 'Habitacion Suite', 'assets/suite/suite4.webp', '$40.000', 'Suite moderna y lujosa con cama amplia, cabecero acolchado, tonos azul suave y muebles minimalistas. Grandes ventanales ofrecen luz natural, creando un ambiente acogedor y sofisticado ');";
  
  TablaEstado: string = "CREATE TABLE IF NOT EXISTS estado(idestado INTEGER PRIMARY KEY , nombreestado VARCHAR(50) NOT NULL);";
  registroEstado: string = "INSERT or IGNORE INTO estado(idestado, nombreestado) VALUES (1,'activado');";
  registroEstado1: string = "INSERT or IGNORE INTO estado(idestado, nombreestado) VALUES (2,'desactivado');";

  TablaDetalle: string = "CREATE TABLE IF NOT EXISTS detalle(iddetalle INTEGER PRIMARY KEY AUTOINCREMENT, idreserva INTEGER NOT NULL, habitacionidhabitacion INTEGER NOT NULL, cantidad INTEGER NOT NULL, finicio VARCHAR(50) NOT NULL, subtotal VARCHAR(50) NOT NULL, FOREIGN KEY (idreserva) REFERENCES reserva(idreserva), FOREIGN KEY (habitacionidhabitacion) REFERENCES habitacion(idhabitacion));";
  registrodetalle: string = "INSERT or IGNORE INTO detalle (iddetalle, idreserva, habitacionidhabitacion, cantidad, finicio, subtotal) VALUES (1, 2, 3, 4, '10/04/2024', '$54.000');";

  TablaHabitacion: string = "CREATE TABLE IF NOT EXISTS habitacion(idhabitacion INTEGER PRIMARY KEY AUTOINCREMENT, tipoidtipo INTEGER NOT NULL, estadoidestado INTEGER, FOREIGN KEY (tipoidtipo) REFERENCES tipo(idtipo),FOREIGN KEY (estadoidestado) REFERENCES estado(idestado) );";
  registrohabitacion1: string = "INSERT or IGNORE INTO habitacion (idhabitacion, tipoidtipo,estadoidestado) VALUES (1, 1, 1);";
  registrohabitacion2: string = "INSERT or IGNORE INTO habitacion (idhabitacion, tipoidtipo,estadoidestado) VALUES (2, 3, 1);";
  registrohabitacion3: string = "INSERT or IGNORE INTO habitacion (idhabitacion, tipoidtipo,estadoidestado) VALUES (3, 2, 1);";
  registrohabitacion4: string = "INSERT or IGNORE INTO habitacion (idhabitacion, tipoidtipo,estadoidestado) VALUES (4, 2, 1);";



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
      
      
      await this.database.executeSql(this.registrorol2,[]);
      await this.database.executeSql(this.registroAdmin,[]);
      await this.database.executeSql(this.registroEstado, []);
      await this.database.executeSql(this.registroEstado1, []);
      await this.database.executeSql(this.registroUsuario, []);
      await this.database.executeSql(this.registrorol,[]);
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
  ModificarUsuario(idusuario: number, nombreusuario: string,telefono: string) {
    return this.database.executeSql('UPDATE usuario SET nombreusuario = ?, telefono = ? WHERE idusuario = ?', [nombreusuario,telefono,idusuario]).then(res => {
       this.presentAlert("Modificar", "USUARIO MODIFICADO");
       this.seleccionarUsuarios();
      });
 }

 ModificarImg(idusuario: number,imagenp: string) {
  return this.database.executeSql('UPDATE usuario SET imagenp = ? WHERE idusuario = ?', [imagenp, idusuario]).then(res => {
     this.presentAlert("Modificar", "USUARIO MODIFICADO");
     this.seleccionarUsuarios(); 
  });
}


BuscarUsu(idusuario: number){
    return this.database.executeSql('SELECT * FROM usuario WHERE idusuario = ?', [idusuario]).then(res =>{
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
  async BuscarUsuCa(correo: string) {
    const query = `SELECT * FROM usuario WHERE correo = ?`;
    const resultado = await this.database.executeSql(query, [correo]);
    if (resultado.rows.length > 0) {
      return resultado.rows.item(0);
    }
    return null;
  }
  BuscarUsuC(correo: string) {
    return this.database.executeSql(
      'SELECT idusuario, correo, rolidrol, contrasena, estadoidestado FROM usuario WHERE correo = ?', [correo]
    ).then(res => {
      if (res.rows.length > 0) {
         // Si las credenciales son correctas, retorna el usuario encontrado
        return {
          idusuario: res.rows.item(0).idusuario,
          correo: res.rows.item(0).correo,
          rolidrol: res.rows.item(0).rolidrol,
          contrasena: res.rows.item(0).contrasena,
          estadoidestado: res.rows.item(0).estadoidestado,
        };
      } else {
        // Si no hay coincidencias, retorna null
        return null;
      }
    }).catch(e => {
      this.presentAlert('Usuario', 'Error: ' + JSON.stringify(e));
      return null;
    });
  }

  ListarReservas() {
    const query = 'SELECT r.idreserva, r.fecha, r.total, r.usuarioidusuario, u.nombreusuario,estadoidestado FROM reserva r INNER JOIN usuario u ON r.usuarioidusuario = u.idusuario h.estadoidestado = ? ';
    return this.database.executeSql(query, ['1']).then(res => {
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
    return this.database.executeSql('SELECT h.idhabitacion, t.nombre, h.estadoidestado FROM habitacion h INNER JOIN tipo t ON h.tipoidtipo = t.idtipo ', []).then(res => {
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
    return this.database.executeSql('SELECT r.idreserva, r.fecha, r.total, r.usuarioidusuario, r.idhabitacion, u.nombreusuario AS nombreusuario,r.estadoidestado FROM reserva r JOIN usuario u ON r.usuarioidusuario = u.idusuario WHERE r.usuarioidusuario = ? AND r.estadoidestado = ?', [idusuario,'1']).then(res => {
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
    return this.database.executeSql('INSERT INTO habitacion(tipoidtipo,estadoidestado) VALUES (?,1)',[tipoidtipo]).then(res=>{
      this.presentAlert("Insertar","Habitacion Registrada");
      this.seleccionarHabitaciones();
    }).catch(e=>{
      this.presentAlert('Insertar', 'Error: ' + JSON.stringify(e));
    })
  }

  ListarHabi() {
    return this.database.executeSql('SELECT h.idhabitacion, t.idtipo, t.nombre, t.imagen, t.precio,h.estadoidestado, t.descripcion FROM habitacion h INNER JOIN tipo t ON h.tipoidtipo = t.idtipo WHERE t.idtipo = ? AND h.estadoidestado = ?', ['1','1']).then(res => {
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
    return this.database.executeSql('SELECT h.idhabitacion, t.idtipo, t.nombre, t.imagen, t.precio, t.descripcion FROM habitacion h INNER JOIN tipo t ON h.tipoidtipo = t.idtipo WHERE t.idtipo = ?  AND h.estadoidestado = ?', ['2','1']).then(res => {
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
    return this.database.executeSql('SELECT h.idhabitacion, t.idtipo, t.nombre, t.imagen, t.precio, t.descripcion FROM habitacion h INNER JOIN tipo t ON h.tipoidtipo = t.idtipo WHERE t.idtipo = ?  AND h.estadoidestado = ?', ['3','1']).then(res => {
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



  insertarUsuario(nombreusuario: string, rutusuario: string, correo: string, contrasena: string, fechan: string, telefono: string, imagenp: string) {
    // Validación de la edad
    if (!this.validarEdad(fechan)) {
      this.presentAlert("Error", "Debes ser mayor de 18 años para registrarte.");
      return; 
    }
    
    // El valor del estado activo es 1, según la tabla "estado"
    const estadoidestado = 1;
    const rolidrol = 1;
    // Consulta de inserción incluyendo el estado
    return this.database.executeSql('INSERT INTO usuario(nombreusuario, correo, rutusuario, contrasena, fechan, telefono, imagenp, rolidrol, estadoidestado) VALUES (?,?,?,?,?,?,?,?,?)', 
      [nombreusuario, correo, rutusuario, contrasena, fechan, telefono, imagenp, rolidrol, estadoidestado])
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
  insertarReserva(fecha: string,noches:number ,total:string,motivo: string,usuarioidusuario:string,idhabitacion: number,){
    return this.database.executeSql('INSERT INTO reserva(fecha,noches,total,motivo,usuarioidusuario,idhabitacion,estadoidestado) VALUES (?,?,?,?,?,?,1)',[fecha,noches,total,motivo,usuarioidusuario,idhabitacion]).then(res=>{
      this.presentAlert("Reserva Registrada","Gracias por reservar con nosotros");
      this.ListarReservas();
    }).catch(e=>{
      this.presentAlert('Insertar', 'Error: ' + JSON.stringify(e)); 
    })
  }
  insertarReservas(fecha: string,noches:number ,total:string,motivo: string,usuarioidusuario:string,idhabitacion: number,){
    return this.database.executeSql('INSERT INTO reserva(fecha,noches,total,motivo,usuarioidusuario,idhabitacion,estadoidestado) VALUES (?,?,?,?,?,?,1)',[fecha,noches,total,motivo,usuarioidusuario,idhabitacion]).then(res=>{
      this.presentAlert("Reserva Registrada","Gracias por reservar con nosotros");
      this.ListarReservas();
    }).catch(e=>{
      this.presentAlert('Insertar', 'Error: ' + JSON.stringify(e)); 
    })
  }

  insertarReservap(fecha: string,noches:number ,total:string,motivo: string,usuarioidusuario:string,idhabitacion: number,){
    return this.database.executeSql('INSERT INTO reserva(fecha,noches,total,motivo,usuarioidusuario,idhabitacion,estadoidestado) VALUES (?,?,?,?,?,?,1)',[fecha,noches,total,motivo,usuarioidusuario,idhabitacion]).then(res=>{
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
  modificarContrap(contrasena: string, idusuario: number) {
    return this.database.executeSql(
      'UPDATE usuario SET contrasena = ? WHERE idusuario = ?',
      [contrasena, idusuario]
    );
  }
  

  llamarid(idhabitacion: number){
    return this.database.executeSql('SELECT idhabitacion FROM habitacion WHERE idhabitacion = ?', [idhabitacion]).then(res => {
    });
  }


  async getReservasPorHabitacion(idHabitacion: number): Promise<any[]> {
    const query = `
      SELECT * FROM reserva 
      WHERE idhabitacion = ? AND estadoidestado = 1`; // Solo reservas activas
    const result = await this.database.executeSql(query, [idHabitacion]);
    const items = [];
    for (let i = 0; i < result.rows.length; i++) {
      items.push(result.rows.item(i));
    }
    return items;
  }

  eliminarHabi(idhabitacion: string) {
    return this.database.executeSql('DELETE FROM habitacion WHERE idhabitacion = ?', [idhabitacion]).then(res => {
      this.presentAlert("Eliminar", "Habitacion ELIMINADA");
      this.ListarReservas(); // Asegúrate de que este método recarga la lista de reservas
    }).catch(e => {
      this.presentAlert('Eliminar', 'Error: ' + JSON.stringify(e));
    });
  }

  //USUARIOS DESACTIVADOS 
  actualizarEstadoUsuario(idusuario: number, estado: number): Promise<any> {
    const query = `UPDATE usuario SET estadoidestado = ? WHERE idusuario = ?`;
    return this.database.executeSql(query, [estado, idusuario]);
  }

  fetchUsuariosPorEstado(estado: number,rolidrol:string): Observable<any[]> {
    return from (this.database.executeSql('SELECT * FROM usuario WHERE estadoidestado = ? AND rolidrol = ?', [estado,rolidrol]))
      .pipe(
        map((res: any) => {
          let usuarios: any[] = [];
          for (let i = 0; i < res.rows.length; i++) {
            usuarios.push(res.rows.item(i));
          }
          return usuarios; // This will be returned as an observable array
        })
      );
  }

  //HABITACIONES DESACTIVADAS
  actualizarEstadoHabitacion(idhabitacion: number, estadoidestado: number) {
    const query = `UPDATE habitacion SET estadoidestado = ? WHERE idhabitacion = ?`;
    return this.database.executeSql(query, [estadoidestado, idhabitacion]);
  }
  fetchHabitacionesPorEstado(estado: number): Observable<any[]> {
    const query = 'SELECT h.idhabitacion, h.tipoidtipo, h.estadoidestado, t.nombre FROM habitacion h JOIN tipo t ON h.tipoidtipo = t.idtipo WHERE estadoidestado = ?';
    return from(this.database.executeSql(query, [estado])).pipe(
      map(data => {
        let habitaciones: any[] = [];
        for (let i = 0; i < data.rows.length; i++) {
          habitaciones.push(data.rows.item(i));
        }
        return habitaciones;
      })
    );
  }
  //RESERVAS DESACTIVADAS
 // En BdService
actualizarEstadoReserva(idreserva: number, estado: number, motivo: string): Promise<void> {
  const query = `UPDATE reserva SET estadoidestado = ?, motivo = ? WHERE idreserva = ?`;
  return this.database.executeSql(query, [estado, motivo, idreserva])
    .then(() => console.log('Reserva desactivada con motivo guardado'))
    .catch(e => console.log('Error al actualizar reserva:', e));
}


  fetchReservaPorEstado(estado: number): Observable<any[]> {
    const query = 'SELECT r.idreserva, r.fecha, r.total,r.motivo, r.usuarioidusuario, r.idhabitacion, u.nombreusuario AS nombreusuario, r.estadoidestado FROM reserva r JOIN usuario u ON r.usuarioidusuario = u.idusuario WHERE r.estadoidestado = ?';
    return from(this.database.executeSql(query, [estado])).pipe(
      map(data => {
        let reservas: any[] = [];
        for (let i = 0; i < data.rows.length; i++) {
          reservas.push(data.rows.item(i));
        }
        return reservas;
      })
    );
  }

  activarReserva(idreserva: number): Promise<void> {
    const query = `UPDATE reserva SET estadoidestado = ? WHERE idreserva = ?`;
    return this.database.executeSql(query, [1, idreserva])
      .then(() => console.log('Reserva activada'))
      .catch(e => console.log('Error al activar reserva:', e));
  }
  
  fetchReservaPorUsuarioYEstado(idusuario: number, estado: number): Observable<any[]> {
    const query = 'SELECT r.idreserva, r.fecha, r.total, r.motivo, r.usuarioidusuario, r.idhabitacion, u.nombreusuario AS nombreusuario, r.estadoidestado FROM reserva r JOIN usuario u ON r.usuarioidusuario = u.idusuario WHERE r.estadoidestado = ? AND r.usuarioidusuario = ?';
    return from(this.database.executeSql(query, [estado, idusuario])).pipe(
      map(data => {
        let reservas: any[] = [];
        for (let i = 0; i < data.rows.length; i++) {
          reservas.push(data.rows.item(i));
        }
        return reservas;
      })
    );
  }

  fetchReservaPorHabitacionYEstado(idhabitacion: number, estadoidestado: number) {
    return from(this.database.executeSql('SELECT * FROM reserva WHERE idhabitacion = ? AND estadoidestado = ?', [idhabitacion, estadoidestado]).then((data) => {
        let reservas = [];
        for (let i = 0; i < data.rows.length; i++) {
          reservas.push(data.rows.item(i));
        }
        return reservas;
      })
    );
  }
  
  fetchHabitacionPorId(idhabitacion: number): Observable<any> {
    const query = 'SELECT h.idhabitacion, h.tipoidtipo, h.estadoidestado, t.nombre, t.precio FROM habitacion h JOIN tipo t ON h.tipoidtipo = t.idtipo WHERE h.idhabitacion = ?';
    return from(this.database.executeSql(query, [idhabitacion])).pipe(
      map(data => {
        let habitaciones: any[] = [];
        for (let i = 0; i < data.rows.length; i++) {
          habitaciones.push(data.rows.item(i));
        }
        return habitaciones.length > 0 ? habitaciones[0] : null;  // Retorna la habitación si existe, o null si no
      })
    );
  }

  fetchUsuarioPorId(idusuario: number): Observable<any> {
    const query = 'SELECT * FROM usuario WHERE idusuario = ?';
    return from(this.database.executeSql(query, [idusuario])).pipe(
      map(data => {
        if (data.rows.length > 0) {
          return data.rows.item(0); // Retorna el primer usuario que coincide con el ID
        }
        return null; // Retorna null si no se encuentra el usuario
      })
    );
  }
  fetchReservaPorId(idreserva: number): Observable<any> {
    const query = 'SELECT * FROM reserva WHERE idreserva = ?';
    return from(this.database.executeSql(query, [idreserva])).pipe(
      map(data => {
        let reservas: any[] = [];
        for (let i = 0; i < data.rows.length; i++) {
          reservas.push(data.rows.item(i));
        }
        return reservas.length > 0 ? reservas[0] : null;  // Retorna la reserva si existe, o null si no
      })
    );
  }
  
  async obtenerUsuarioPorCredenciales(correo: string, contrasena: string): Promise<Usuario | null> {
    try {
      const query = `SELECT * FROM usuario WHERE correo = ? AND contrasena = ?`;
      const res = await this.database.executeSql(query, [correo, contrasena]);
  
      if (res.rows.length > 0) {
        const usuario = res.rows.item(0);
        return {
          idusuario: usuario.idusuario,
          nombreusuario: usuario.nombreusuario,
          correo: usuario.correo,
          rutusuario: usuario.rutusuario,
          contrasena: usuario.contrasena,
          fechan: usuario.fechan,
          telefono: usuario.telefono,
          imagenp: usuario.imagenp,
          rolidrol: usuario.rolidrol,
          estadoidestado: usuario.estadoidestado
        };
      } else {
        return null; // Si no se encuentra el usuario
      }
    } catch (error) {
      console.error('Error al obtener usuario por credenciales', error);
      return null;
    }
  }
  
  async obtenerRolPorUsuario(idRol: number): Promise<Rol | null> {
    try {
      const query = `SELECT * FROM rol WHERE idrol = ?`;
      const res = await this.database.executeSql(query, [idRol]);
  
      if (res.rows.length > 0) {
        const rol = res.rows.item(0);
        return { idrol: rol.idrol, nombrerol: rol.nombrerol };
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error al obtener rol del usuario', error);
      return null;
    }
  }
  
  
}