import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  mostrarFooter: boolean = true;
  url: string = window.location.pathname;

  constructor() { }

  ngOnInit(): void {
    window.location.pathname.includes("login") ? this.mostrarFooter = false : this.mostrarFooter = true;
    
    
  }

}
