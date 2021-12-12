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
    public dialog: MatDialog
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

  deletarProdutoId(id: number): void{
    this.produtosService.deletarProdutoId(id).subscribe({
      next: value => this.encontrarTodosProdutos(),
      error: erro => console.log("deu BO")
    })
  }
}

