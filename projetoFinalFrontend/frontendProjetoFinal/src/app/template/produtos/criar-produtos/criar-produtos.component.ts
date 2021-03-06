import { ProdutosService } from "src/app/service/produtos.service";
import { FormBuilder } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Produto } from "src/app/models/produto";

@Component({
  selector: "app-criar-produtos",
  templateUrl: "./criar-produtos.component.html",
  styleUrls: ["./criar-produtos.component.css"],
})
export class CriarProdutosComponent implements OnInit {
  formularioProduto: FormGroup;
  id: number;

  constructor(
    private fb: FormBuilder,
    private produtosService: ProdutosService,
    private activeRouter: ActivatedRoute,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.id = this.activeRouter.snapshot.params["id"];
    if (this.id) {
      this.formularioVazio();
      this.produtosService.listarProdutoId(this.id).subscribe({
        next: (prod) => this.formularioPreenchido(prod),
        error: (erro) => console.log("errouuuu"),
      });
    } else {
      this.formularioVazio();
    }
  }

  formularioVazio() {
    this.formularioProduto = this.fb.group({
      id: [null],
      nome: [null],
      valor: [null],
    });
  }

  formularioPreenchido(produto: Produto) {
    this.formularioProduto = this.fb.group({
      id: [produto.id],
      nome: [produto.nome],
      valor: [produto.valor],
    });
  }

  cadastrarProduto() {
    this.produtosService.criarProduto(this.formularioProduto.value).subscribe({
      next: (cadastrado) => {
        alert("Produto cadastrado!");
        this.router.navigate(["/produtos"])
      },
      error: (erro) =>alert("Preencha todos os campos"),
    });
  }
}
