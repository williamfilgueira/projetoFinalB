import { FormBuilder, FormGroup } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { Usuario } from "src/app/models/usuario";
import { UsuarioService } from "src/app/service/usuario.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-criar-login",
  templateUrl: "./criar-login.component.html",
  styleUrls: ["./criar-login.component.css"],
})
export class CriarLoginComponent implements OnInit {
  formularioUsuario: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.formularioVazio();
  }

  formularioVazio() {
    this.formularioUsuario = this.fb.group({
      id: [null],
      nome: [null],
      email: [null],
      senha: [null],
    });
  }

  formularioPreenchido(usuario: Usuario) {
    this.formularioUsuario = this.fb.group({
      id: [usuario.id],
      nome: [usuario.nome],
      email: [usuario.email],
      senha: [usuario.senha],
    });
  }

  criarUsuario() {
    this.usuarioService.criarUsuario(this.formularioUsuario.value).subscribe({
      next: (cadastrado) => {
        console.log(cadastrado);
        alert("Cadastrado com sucesso!");
        this.router.navigate(["/login"])
      },
      error: (erro) => alert("Preencha todos os campos!")
    });
  }
}
