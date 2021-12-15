import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { take } from "rxjs";
import { Cliente } from "src/app/models/cliente";
import { ClientesService } from "src/app/service/clientes.service";

@Component({
  selector: "app-clientes",
  templateUrl: "./clientes.component.html",
  styleUrls: ["./clientes.component.css"],
})
export class ClientesComponent implements OnInit {
  cliente: Cliente[] = [];

  constructor(
    private clientesService: ClientesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.encontrarTodosClientes();
  }

  encontrarTodosClientes() {
    this.clientesService
      .listarTodosClientes()
      .pipe(take(1))
      .subscribe({
        next: (client) => (this.cliente = client),
        error: (error) => console.log(error),
      });
  }

  criarCliente(cliente: Cliente) {
    this.clientesService.criarCliente(cliente).subscribe({
      next: (value) => this.criarCliente(cliente),
      error: (erro) => console.log("erro"),
    });
  }

  atualizarCliente(id: number) {
    this.router.navigate(["/criarCliente", id]);
  }

  deletarClienteId(id: number): void {
    this.clientesService.deletarClienteID(id).subscribe({
      next: (value) => this.encontrarTodosClientes(),
      error: (erro) => console.log("deu BO"),
    });
  }

  pesquisarCliente(e : any){
    this.clientesService.listarTodosClientes().subscribe({
      next : prod => this.cliente = prod.filter((p)=> p.id == e),
      error : err => console.log(err)
    })
  }
}
