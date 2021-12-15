import { Router } from '@angular/router';
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { take } from "rxjs";
import { Produto } from "src/app/models/produto";
import { ProdutosService } from "src/app/service/produtos.service";
import { LiveFormDialogComponent } from "src/app/views/excluir/live-form-dialog/live-form-dialog.component";

@Component({
  selector: "app-produtos",
  templateUrl: "./produtos.component.html",
  styleUrls: ["./produtos.component.css"],
})
export class ProdutosComponent implements OnInit {
  produtos: Produto[] = [];

  // instanciando o servico de produtos
  constructor(
    private produtosService: ProdutosService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  // toda vez que carregar o modulo o ngOniInit irar carrear a função encontrarTodosProdutos
  ngOnInit(): void {
    this.encontrarTodosProdutos();
    
  }

  // criando metodo para listar produtos da API
  encontrarTodosProdutos() {
    this.produtosService
      .listarTodosProdutos()
      .pipe(take(1))
      .subscribe({
        next: (prod) => (this.produtos = prod),
        error: (error) => console.log(error),
      });
  }

  abrirModalExcluir(): void {
    const dialogRef = this.dialog.open(LiveFormDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  criarProduto(produto:Produto){
    this.produtosService.criarProduto(produto).subscribe({
      next: value => this.criarProduto(produto),
      error: erro => console.log("erro")
    })
  }

  atualizarProduto(id:number){
    this.router.navigate(["/criarProduto",id])
  }

  deletarProdutoId(id: number): void{
    this.produtosService.deletarProdutoId(id).subscribe({
      next: value => this.encontrarTodosProdutos(),
      error: erro => console.log("deu BO")
    })
  }

  pesquisarProduto(e : any){
    this.produtosService.listarTodosProdutos().subscribe({
      next : prod => this.produtos = prod.filter((p)=> p.id == e),
      error : err => console.log(err)
    })
  }
}

