import { Cliente } from "./cliente";

export class Endereco {
    id: number;
    cep: string;
    rua: string;
    numero: number;
    bairro: string;
    complemento: string;
    cliente: Cliente;
}