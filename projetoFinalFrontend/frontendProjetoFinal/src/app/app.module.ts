import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatDialogModule} from '@angular/material/dialog';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './template/login/login.component';
import { DashboardComponent } from './template/dashboard/dashboard.component';
import { FooterComponent } from './template/footer/footer.component';
import { HeaderComponent } from './template/header/header.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { ProdutosComponent } from './template/produtos/produtos.component';
import { HttpClientModule } from '@angular/common/http';
import { ClientesComponent } from './template/clientes/clientes.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CriarLoginComponent } from './template/criar-login/criar-login.component';
import { LiveFormDialogComponent } from './views/excluir/live-form-dialog/live-form-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    DashboardComponent,
    FooterComponent,
    ProdutosComponent,
    ClientesComponent,
    CriarLoginComponent,
    LiveFormDialogComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    BrowserAnimationsModule
  
    
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
