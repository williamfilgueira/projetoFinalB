import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Cliente } from "../models/cliente";

@Injectable({
  providedIn: "root",
})
export class ClientesService {
  url: string = "http://localhost:8080/clientes";
  constructor(private httpClient: HttpClient) {}

  listarTodosClientes(): Observable<Cliente[]> {
    return this.httpClient.get<Cliente[]>(`${this.url}`);
  }

  listarClienteId(id: number): Observable<Cliente> {
    return this.httpClient.get<Cliente>(`${this.url}/${id}`);
  }

  criarCliente(cliente: Cliente): Observable<Cliente> {
    return this.httpClient.post<Cliente>(`${this.url}`, cliente);
  }

  atualizarProduto(cliente: Cliente): Observable<Cliente> {
    return this.httpClient.put<Cliente>(`${this.url}/${cliente.id}`, cliente);
  }

  deletarClienteID(id: number): Observable<Cliente> {
    return this.httpClient.delete<Cliente>(`${this.url}/${id}`);
  }
}
