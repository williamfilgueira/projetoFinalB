import { CriarClienteComponent } from './template/clientes/criar-cliente/criar-cliente.component';
import { CriarProdutosComponent } from './template/produtos/criar-produtos/criar-produtos.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './template/clientes/clientes.component';
import { CriarLoginComponent } from './template/criar-login/criar-login.component';
import { DashboardComponent } from './template/dashboard/dashboard.component';
import { LoginComponent } from './template/login/login.component';
import { ProdutosComponent } from './template/produtos/produtos.component';

const routes: Routes = [{
  path: '',
  redirectTo: 'login',
  pathMatch: 'full'
},
{
  path: 'login',
  component: LoginComponent
},
{
  path: 'dashboard',
  component: DashboardComponent
}
,
{
  path: 'produtos',
  component: ProdutosComponent
}
,
{
  path: 'clientes',
  component: ClientesComponent
}
,
{
  path: 'criarLogin',
  component: CriarLoginComponent
}
,
{
  path: 'criarProduto',
  component: CriarProdutosComponent
}
,
{
  path: 'criarProduto/:id',
  component: CriarProdutosComponent
},
{
  path: 'criarCliente',
  component: CriarClienteComponent
},
{
  path: 'criarCliente/:id',
  component: CriarClienteComponent
}
]




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
