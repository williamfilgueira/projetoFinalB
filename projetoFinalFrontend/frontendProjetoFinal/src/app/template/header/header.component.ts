import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  mostrarNav : boolean = true;

  constructor(

  ) { }

  ngOnInit(): void {
    window.location.pathname.includes("login")? this.mostrarNav = false : this.mostrarNav = true;
  }

}
