import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private httpClient: HttpClient) { }

  url: string = "http://localhost:8080/usuario";

  url2: string = "http://localhost:8080/usuario/login?"

  loginUsuario(nome: string, senha: string): Observable<Usuario>{
    const httpOptions = { 
      headers: new HttpHeaders({
        'Content-Type':'aplication/json',
        'Authorization': 'Basic ' + btoa(nome + ":" + senha) 
      })
     }
    return this.httpClient.get<Usuario>(this.url, httpOptions);
  }

  filtrarUsuario( nome: string): Observable<Usuario>{
    return this.httpClient.get<Usuario>(`${this.url2}${nome}`);
  }

   // metodo observable para fazer uma requisição na api
   listarTodosUsuarios(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(`${this.url}`);
  }

  // metodo observable para fazer uma requisição na api para retornar produto por id
  listarUsuarioId(id: number): Observable<Usuario> {
    return this.httpClient.get<Usuario>(`${this.url}/${id}`);
  }

  criarUsuario(usuario: Usuario) {
    return this.httpClient.post<Usuario>(`${this.url}`, usuario);
  }

  atualizarUsuario(usuario: Usuario) {
    return this.httpClient.put<Usuario>(`${this.url}/${usuario.id}`, usuario);
  }

  // metodo observable para fazer uma requisição na api para retornar produto por id
  deletarUsuarioId(id: number): Observable<Usuario> {
    return this.httpClient.delete<Usuario>(`${this.url}/${id}`);
  }

}
