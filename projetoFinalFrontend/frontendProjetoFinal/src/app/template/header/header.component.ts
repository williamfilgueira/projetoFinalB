import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  mostrarNav : boolean = true;
  usuario: Usuario = new Usuario();
  constructor(
   private router: Router
  ) { }

  ngOnInit(): void {
    window.location.pathname.includes("login")? this.mostrarNav = false : this.mostrarNav = true;
    this.usuario = JSON.parse(localStorage.getItem("usuario")!)
  }

  logout(): void{
    localStorage.removeItem("usuario"),
    this.router.navigate(["/login"])
  }


}
