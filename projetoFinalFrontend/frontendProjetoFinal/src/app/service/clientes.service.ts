import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Cliente } from "../models/cliente";

@Injectable({
  providedIn: "root",
})
export class ClientesService {
  
  constructor(private httpClient: HttpClient) {}

  url: string = "http://localhost:8080/clientes";

  listarTodosClientes(): Observable<Cliente[]> {
    return this.httpClient.get<Cliente[]>(`${this.url}`);
  }

  listarClienteId(id:number): Observable<Cliente>{
    return this.httpClient.get<Cliente>(`${this.url}/${id}`);
  }


  criarCliente(cliente: Cliente) {
    return this.httpClient.post<Cliente>(`${this.url}`, cliente);
  }

  atualizarProduto(cliente: Cliente) {
    return this.httpClient.put<Cliente>(`${this.url}/${cliente.id}`, cliente);
  }


  deletarClienteID(id: number): Observable<Cliente>{
    return this.httpClient.delete<Cliente>(`${this.url}/${id}`);
  }



}
