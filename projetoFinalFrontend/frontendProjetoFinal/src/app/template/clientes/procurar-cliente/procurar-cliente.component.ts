import { ClientesService } from 'src/app/service/clientes.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';

@Component({
  selector: 'app-procurar-cliente',
  templateUrl: './procurar-cliente.component.html',
  styleUrls: ['./procurar-cliente.component.css']
})
export class ProcurarClienteComponent implements OnInit {

procurarCliente: FormGroup
clientes: Cliente[] = [];
@Output() pesquisarCliente = new EventEmitter();
idCliente:number;
  constructor(
    private clienteService: ClientesService,
    private fb : FormBuilder

  ) { }

  ngOnInit(): void {
    this.listarClientes();
    this.procurarCliente = this.fb.group({
      cliente: [null]
    })

  }

  listarClientes(){
    this.clienteService.listarTodosClientes().subscribe({
      next : prod => this.clientes = prod,
      error : err => console.log(err)
    })
  }

  ngOnChange(e : any){
    this.idCliente = e.id;
  }

  filtrarCliente(){
    this.pesquisarCliente.emit(this.idCliente)
  }

}
