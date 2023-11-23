import Veiculo from "./veiculo";
import Cliente from "./cliente";

class Locadora {
  private veiculos: Veiculo[] = [];
  private clientes: Cliente[] = [];

  cadastrarVeiculo(veiculo: Veiculo): void {
    const veiculoExistente = this.veiculos.find((v) => v.placa === veiculo.placa);

    if (veiculoExistente) {
      console.log("\x1b[33m❌ Veículo com a placa " + veiculo.placa + " já está cadastrado.\x1b[0m");
    } else {
      this.veiculos.push(veiculo);
      console.log("\x1b[32m✅ Veículo " + veiculo.modelo + " cadastrado com sucesso.\x1b[0m");
    }
  }

  cadastrarCliente(cliente: Cliente): void {
    const clienteExistente = this.clientes.find((c) => c.cpf === cliente.cpf);

    if (clienteExistente) {
      console.log("\x1b[33m❌ Cliente com o CPF " + cliente.cpf + " já está cadastrado.\x1b[0m");
    } else {
      this.clientes.push(cliente);
      console.log("\x1b[32m✅ Cliente " + cliente.nome + " cadastrado com sucesso.\x1b[0m");
    }
  }

  buscarCliente(cpf: string): Cliente | undefined {
    return this.clientes.find((cliente) => cliente.cpf === cpf);
  }

  listarVeiculosDisponiveis(): void {
    const veiculosDisponiveis = this.veiculos.filter((veiculo) => veiculo.disponivel);
    console.log("\x1b[36m✅Veículos disponíveis:\x1b[0m");
    veiculosDisponiveis.forEach((veiculo) =>
      console.log("\x1b[36m✅" + veiculo.modelo + " - " + veiculo.marca + " - " + veiculo.placa + "\x1b[0m")
    );
  }

  alugarVeiculo(placa: string, cliente: Cliente, qtdDiasContratados: number): void {
    const veiculoEncontrado = this.veiculos.find((veiculo) => veiculo.placa === placa);

    if (veiculoEncontrado) {
      if (veiculoEncontrado.disponivel && !veiculoEncontrado.usuario && cliente.tipoCarteira === veiculoEncontrado.carteiraNecessaria && !cliente.estaAlugando()) {
        veiculoEncontrado.alugar(cliente);
        const valorDoAluguel = this.calcularValorDoAluguel(veiculoEncontrado, qtdDiasContratados)
        console.log(`\x1b[32m🚕 Veículo ${veiculoEncontrado.modelo} alugado por ${cliente.nome} com sucesso! Valor do aluguel R$${valorDoAluguel}\x1b[0m`);
      } else if (veiculoEncontrado.usuario) {
        console.log(`\x1b[31m❌ Veículo ${veiculoEncontrado.modelo} está sendo usado por ${veiculoEncontrado.usuario.nome}.\x1b[0m`);
      } else if (cliente.estaAlugando()) {
        console.log(`\x1b[31m❌ Cliente ${cliente.nome} já está alugando um veículo.\x1b[0m`);
      } else if (cliente.tipoCarteira !== veiculoEncontrado.carteiraNecessaria) {
        console.log(`\x1b[31m❌ Veículo ${veiculoEncontrado.modelo} requer uma carteira do tipo ${veiculoEncontrado.carteiraNecessaria}.\x1b[0m`);
      } else {
        console.log(`\x1b[31m❌ Veículo ${veiculoEncontrado.modelo} não está disponível para aluguel para este cliente.\x1b[0m`);
      }
    } else {
      console.log("\x1b[31m❌ Veículo não encontrado.\x1b[0m");
    }
  }

  calcularValorDoAluguel(veiculoAlugado: Veiculo, qtdDiasContratados: number): number {
    const valorDoAluguelPorDia = veiculoAlugado.valorHoraAluguel * 24
    return valorDoAluguelPorDia * qtdDiasContratados
  }

  devolverVeiculo(placa: string, cpf: string): void {
    const veiculoEncontrado = this.veiculos.find((veiculo) => veiculo.placa === placa);

    if (veiculoEncontrado && veiculoEncontrado.usuario && veiculoEncontrado.usuario.cpf === cpf) {
      if (!veiculoEncontrado.disponivel) {
        veiculoEncontrado.devolver();
        console.log("\x1b[32m✅ Veículo " + placa + " devolvido com sucesso pelo CPF: " + cpf + "\x1b[0m");
      } else {
        console.log(`\x1b[31m❌ Veículo ${veiculoEncontrado.modelo} já está disponível.\x1b[0m`);
      }
    } else if (veiculoEncontrado && !veiculoEncontrado.usuario) {
      console.log("\x1b[31m❌ Veículo " + placa + " não está alugado no momento.\x1b[0m");
    } else {
      console.log("\x1b[31m❌ Veículo " + placa + " não encontrado ou o CPF " + cpf + " não corresponde ao locatário.\x1b[0m");
    }
  }

  excluirVeiculo(placa: string): void {
    const veiculoEncontrado = this.veiculos.find((veiculo) => veiculo.placa === placa);

    if (veiculoEncontrado) {
      if (!veiculoEncontrado.disponivel) {
        console.log("\x1b[31m❌ Veículo está sendo usado e não pode ser excluído!\x1b[0m");
      } else {
        this.veiculos = this.veiculos.filter((veiculo) => veiculo.placa !== placa);
        console.log("\x1b[32m✅ Veículo " + placa + " removido com sucesso.\x1b[0m");
      }
    } else {
      console.log("\x1b[31m❌ Veículo não encontrado!\x1b[0m");
    }
  }
}

export default Locadora;
