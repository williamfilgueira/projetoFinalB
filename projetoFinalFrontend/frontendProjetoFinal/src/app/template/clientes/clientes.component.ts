import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Cliente } from 'src/app/models/cliente';
import { ClientesService } from 'src/app/service/clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] = []

  constructor( private clientesService: ClientesService) { }

  ngOnInit(): void {
    this.encontrarTodosClintes()
  }


  encontrarTodosClintes(){
    this.clientesService.listarTodosClientes().pipe(take(1)).subscribe({
      next: client => this.clientes = client,
      error: error => console.log(error)
    })
  }
}
