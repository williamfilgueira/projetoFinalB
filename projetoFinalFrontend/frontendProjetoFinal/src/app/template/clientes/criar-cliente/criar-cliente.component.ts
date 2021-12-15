import { EnderecoComponent } from './../../endereco/endereco.component';
import { ClientesService } from 'src/app/service/clientes.service';
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Cliente } from 'src/app/models/cliente';

@Component({
  selector: "app-criar-cliente",
  templateUrl: "./criar-cliente.component.html",
  styleUrls: ["./criar-cliente.component.css"],
})
export class CriarClienteComponent implements OnInit {
  
@ViewChild(EnderecoComponent) child: EnderecoComponent;



  formularioCliente: FormGroup;
  id: number;

  constructor(
    private fb: FormBuilder, 
    private activeRouter: ActivatedRoute,
    private clientesService: ClientesService,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.id = this.activeRouter.snapshot.params["id"];
    if (this.id) {
      this.formularioVazio();
      this.clientesService.listarClienteId(this.id).subscribe({
        next: (prod) => this.formularioPreenchido(prod),
        error: (erro) => console.log("errouuuu"),
      });
    } else {
      this.formularioVazio();
    }
  }


  formularioVazio() {
    this.formularioCliente = this.fb.group({
      id: [null],
      nome: [null],
      cpf: [null],
      email: [null],
      idade: [null],
    });
  }

  formularioPreenchido(cliente: Cliente) {
    this.formularioCliente = this.fb.group({
      id: [cliente.id],
      nome: [cliente.nome],
      cpf: [cliente.cpf],
      email: [cliente.email],
      idade: [cliente.idade],
    });
  }

  cadastrarCliente() {
    this.clientesService.criarCliente(this.formularioCliente.value).subscribe({
      next: (cadastrado) => {
        console.log("cadastrado", cadastrado.id);
        this.router.navigate(["/endereco", cadastrado.id])
      },
      error: (erro) => console.log("errouuu"),
    });
    
  }

  salvarEndereco(){

  }
}
