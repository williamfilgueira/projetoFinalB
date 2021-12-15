import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Endereco } from "../models/endereco";

@Injectable({
  providedIn: "root",
})
export class EnderecoService {
  url: string = "http://localhost:8080/endereco";

  constructor(private httpClient: HttpClient) {}

  listarTodosEnderecos(): Observable<Endereco[]> {
    return this.httpClient.get<Endereco[]>(`${this.url}`);
  }

  listarEnderecoId(id: number): Observable<Endereco> {
    return this.httpClient.get<Endereco>(`${this.url}/${id}`);
  }

  criarEndereco(endereco: Endereco): Observable<Endereco> {
    return this.httpClient.post<Endereco>(`${this.url}`, endereco);
  }

  atualizarEndereco(endereco: Endereco): Observable<Endereco> {
    return this.httpClient.put<Endereco>(
      `${this.url}/${endereco.id}`,
      endereco
    );
  }
}
