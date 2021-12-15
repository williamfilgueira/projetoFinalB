import { ClientesService } from 'src/app/service/clientes.service';
import { ActivatedRoute } from '@angular/router';
import { EnderecoService } from './../../service/endereco.service';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.css']
})
export class EnderecoComponent implements OnInit {

  formularioEndereco: FormGroup;
  id : number;

  constructor(
    private fb:FormBuilder,
    private enderecoService : EnderecoService,
    private clienteService : ClientesService,
    private activatedRoute : ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params["id"];
    if(this.id){
      this.formularioVazio();
      this.clienteService.listarClienteId(this.id).subscribe({
        next: (prod) => this.formularioPreenchido(prod),
        error: (erro) => console.log("errouuuu"),
      });

    } else {
      this.formularioVazio()
    }

  }

  formularioVazio(){
    this.formularioEndereco = this.fb.group({
      id: [null],
      cep: [null],
      rua: [null],
      numero: [null],
      bairro: [null],
      complemento: [null],
      cliente: [null],
    })
  }
  formularioPreenchido(cliente : Cliente){
    this.formularioEndereco = this.fb.group({
      id: [null],
      cep: [null],
      rua: [null],
      numero: [null],
      bairro: [null],
      complemento: [null],
      cliente: [cliente],
    })
  }

  teste(){
    console.log(this.formularioEndereco.value)
    this.enderecoService.criarEndereco(this.formularioEndereco.value).subscribe({
      next: ende => console.log("Cadastrado com sucesso", ende),
      error : err => console.log(err)
    })
    
  }

}
