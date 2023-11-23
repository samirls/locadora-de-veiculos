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
      console.log(`\x1b[32m🚕 Veículo ${this.modelo} alugado por ${this.usuario.nome} com sucesso.\x1b[0m`);
    } else if (this.usuario) {
      console.log(`\x1b[31m❌ Veículo ${this.modelo} está sendo usado por ${this.usuario.nome}.\x1b[0m`);
    } else if (cliente.estaAlugando()) {
      console.log(`\x1b[31m❌ Cliente ${cliente.nome} já está alugando um veículo.\x1b[0m`);
    } else if (cliente.tipoCarteira !== this.carteiraNecessaria) {
      console.log(`\x1b[31m❌ Veículo ${this.modelo} requer uma carteira do tipo ${this.carteiraNecessaria}.\x1b[0m`);
    } else {
      console.log(`\x1b[31m❌ Veículo ${this.modelo} não está disponível para aluguel para este cliente.\x1b[0m`);
    }
  }

  devolver(): void {
    if (!this.disponivel) {
      this.disponivel = true;
      const usuarioNome = this.usuario ? this.usuario.nome : 'Desconhecido';
      console.log(`\x1b[32m🔁 Veículo ${this.modelo} devolvido por ${usuarioNome} com sucesso.\x1b[0m`);
      this.usuario = null;
    } else {
      console.log(`\x1b[31m❌ Veículo ${this.modelo} já está disponível.\x1b[0m`);
    }
  }
}

export default Veiculo;
