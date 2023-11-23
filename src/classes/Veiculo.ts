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
  ) {}

  alugar(cliente: Cliente): void {
    if (this.disponivel && !this.usuario && cliente.tipoCarteira === this.carteiraNecessaria && !cliente.estaAlugando()) {
      this.disponivel = false;
      this.usuario = cliente;
      cliente.alugando = this;
      console.log(`Veículo ${this.modelo} alugado por ${this.usuario.nome} com sucesso.`);
    } else if (this.usuario) {
      console.log(`Veículo ${this.modelo} está sendo usado por ${this.usuario.nome}.`);
    } else if (cliente.estaAlugando()) {
      console.log(`Cliente ${cliente.nome} já está alugando um veículo.`);
    } else if (cliente.tipoCarteira !== this.carteiraNecessaria) {
      console.log(`Veículo ${this.modelo} requer uma carteira do tipo ${this.carteiraNecessaria}.`);
    } else {
      console.log(`Veículo ${this.modelo} não está disponível para aluguel para este cliente.`);
    }
  }

  devolver(): void {
    if (!this.disponivel) {
      this.disponivel = true;
      const usuarioNome = this.usuario ? this.usuario.nome : 'Desconhecido';
      console.log(`Veículo ${this.modelo} devolvido por ${usuarioNome} com sucesso.`);
      this.usuario = null;
    } else {
      console.log(`Veículo ${this.modelo} já está disponível.`);
    }
  }
}

export default Veiculo