import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Produto } from 'src/app/models/produto';
import { ProdutosService } from 'src/app/service/produtos.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  produtos: Produto[] = []

  // instanciando o servico de produtos
  constructor( private produtosService: ProdutosService ) { }

  // toda vez que carregar o modulo o ngOniInit irar carrear a função encontrarTodosProdutos
  ngOnInit(): void {
    this.encontrarTodosProdutos()
  }
// criando metodo para listar produtos da API
  encontrarTodosProdutos(){
    this.produtosService.listarTodosProdutos().pipe(take(1)).subscribe({
      next: prod => this.produtos = prod,
      error: error => console.log(error)
    })
  }

 


}
