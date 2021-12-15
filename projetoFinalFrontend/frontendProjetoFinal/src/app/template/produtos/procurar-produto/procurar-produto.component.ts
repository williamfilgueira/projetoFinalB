import { EventEmitter } from '@angular/core';
import { Produto } from './../../../models/produto';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ProdutosService } from './../../../service/produtos.service';
import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-procurar-produto',
  templateUrl: './procurar-produto.component.html',
  styleUrls: ['./procurar-produto.component.css']
})
export class ProcurarProdutoComponent implements OnInit {

  cadastro : FormGroup
  produto : Produto[]=[];
  @Output() pesquisarProduto = new EventEmitter();
  idProduto : number;

  constructor(
    private produtoService : ProdutosService,
    private fb : FormBuilder
     ) { }

  ngOnInit(): void {
    this.listarProdutos();
    this.cadastro = this.fb.group({
      produto : [null]
    })
  }

  listarProdutos(){
    this.produtoService.listarTodosProdutos().subscribe({
      next : prod => this.produto = prod,
      error : err => console.log(err)
    })
  }

  ngOnChange(e : any){
    this.idProduto = e.id;
  }

  filtrarProduto(){
    this.pesquisarProduto.emit(this.idProduto)
  }

}
