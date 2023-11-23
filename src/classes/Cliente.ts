import Veiculo from "./veiculo";

class Cliente {
  constructor(
    public nome: string,
    public cpf: string,
    public tipoCarteira: string,
    public alugando: Veiculo | null = null
  ) {}

  estaAlugando(): boolean {
    return this.alugando !== null;
  }
}

export default Cliente