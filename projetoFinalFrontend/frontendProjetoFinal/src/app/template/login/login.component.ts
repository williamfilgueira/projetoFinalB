import { HttpParams } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { UsuarioService } from "src/app/service/usuario.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;

  constructor(
    private formB: FormBuilder,
    private userService: UsuarioService,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.formLogin = this.formB.group({
      nome: [null],
      senha: [null],
    });
  }

  logar() {
    this.userService
      .loginUsuario(this.formLogin.value.nome, this.formLogin.value.senha)
      .subscribe({
        next: (nomeUsuario) => {
          let params = new HttpParams().set("nome", this.formLogin.value.nome);
          this.userService.filtrarUsuario(params.toString()).subscribe({
            next: (usuario) => this.router.navigate(["/dashboard"]).then(()=>{
              window.location.reload()
            }),
            error: (err) => console.log("não é essa senha seu burro"),
          });
        },
        error: (err) => console.log("erro na permição"),
      });
  }
}
