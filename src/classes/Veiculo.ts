import Cliente from "./cliente";

class Veiculo {
  constructor(
    public placa: string,
    public modelo: string,
    public marca: string,
    public valorHoraAluguel: number,
    public disponivel: boolean = true,
    public usuario: Cliente | null = null,
    public carteiraNecessaria: string
  ) { }

  alugar(cliente: Cliente): void {
    this.disponivel = false;
    this.usuario = cliente;
    cliente.alugando = this;
  }

  devolver(): void {
    this.disponivel = true;

    this.usuario = null;

  }
}

export default Veiculo;
