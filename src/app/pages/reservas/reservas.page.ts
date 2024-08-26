import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.page.html',
  styleUrls: ['./reservas.page.scss'],
})
export class ReservasPage implements OnInit {
  reservas = [
    {habitacion: 'Suite Familiar', fecha: '2024-08-25', hora: '14:00' },
    {habitacion: 'Suite Presidencial', fecha: '2024-08-26', hora: '16:00' },
    {habitacion: 'Suite', fecha: '2024-08-27', hora: '10:00' }
  ];

  constructor() { }

  ngOnInit() {
  }

}
