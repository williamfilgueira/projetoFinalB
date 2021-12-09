import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Produto } from "../models/produto";

@Injectable({
  providedIn: "root",
})
export class ProdutosService {
  // instaciar outras classes dentro do construtor
  constructor(private httpClient: HttpClient) {}

  // requisição igual a da API
  url: string = "http://localhost:8080/produtos";

  // metodo observable para fazer uma requisição na api
  listarTodosProdutos(): Observable<Produto[]> {
    return this.httpClient.get<Produto[]>(`${this.url}`);
  }

  // metodo observable para fazer uma requisição na api para retornar produto por id
  listarTodosProdutosId(id: number): Observable<Produto> {
    return this.httpClient.get<Produto>(`${this.url}/${id}`);
  }
  // metodo observable para fazer uma requisição na api para retornar produto por id
  deletarProdutoId(id: number): Observable<Produto> {
    return this.httpClient.delete<Produto>(`${this.url}/${id}`);
  }
}
