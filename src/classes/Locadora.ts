import Veiculo from "./veiculo";
import Cliente from "./cliente";
import Aluguel from "./aluguel";

class Locadora {
  private veiculos: Veiculo[] = [];
  private clientes: Cliente[] = [];
  private alugueis: Aluguel[] = [];

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

  buscarVeiculo(placa: string): Veiculo | undefined {
    return this.veiculos.find((veiculo) => veiculo.placa === placa);
  }

  listarClientes(): void {
    if (this.clientes.length === 0) {
      console.log("\x1b[31m❌ Não há clientes cadastrados.\x1b[0m");
      return;
    }
    console.log("\x1b[36m Lista de clientes:\x1b[0m");
    this.clientes.forEach((cliente) => console.log("\x1b[36m " + cliente.nome + " - " + cliente.cpf + "\x1b[0m"));
  }

  listarVeiculosDisponiveis(): void {
    if (this.veiculos.length === 0) {
      console.log("\x1b[31m❌ Não há veículos cadastrados.\x1b[0m");
      return;
    }
    const veiculosDisponiveis = this.veiculos.filter((veiculo) => veiculo.disponivel);
    console.log("\x1b[36m✅Veículos disponíveis:\x1b[0m");
    veiculosDisponiveis.forEach((veiculo) =>
      console.log("\x1b[36m✅" + veiculo.modelo + " - " + veiculo.marca + " - " + veiculo.placa + "\x1b[0m")
    );
  }

  listarAlugueis(): void {
    if (this.alugueis.length === 0) {
      console.log("\x1b[31m❌ Não há aluguéis registrados.\x1b[0m");
      return;
    }
    console.log("\x1b[36m Lista de aluguéis:\x1b[0m");
    this.alugueis.forEach((aluguel) => console.log("\x1b[36m " + aluguel.cliente.nome + " - " + aluguel.veiculo.modelo + " - " + (aluguel.dataFim !== null ? "Finalizado" : "Ativo") + "\x1b[0m"));
  }

  alugarVeiculo(placa: string, cpf: string): void {
    const veiculoAlugar = this.buscarVeiculo(placa);
    const clienteAlugar = this.buscarCliente(cpf);

    if (veiculoAlugar && clienteAlugar){
      if (veiculoAlugar.disponivel && veiculoAlugar.disponivel && clienteAlugar.tipoCarteira === veiculoAlugar.carteiraNecessaria && !clienteAlugar.estaAlugando()) {
        const novoAluguel = new Aluguel(veiculoAlugar, clienteAlugar);
        this.alugueis.push(novoAluguel);
        console.log(`\x1b[32m🚕 Veículo ${veiculoAlugar.modelo} alugado por ${clienteAlugar.nome} com sucesso! Valor da hora contratada R$${veiculoAlugar.valorHoraAluguel}\x1b[0m`);
      } else if (!veiculoAlugar.disponivel) {
        console.log(`\x1b[31m❌ Veículo ${veiculoAlugar.modelo} está alugado.\x1b[0m`);
      } else if (clienteAlugar.estaAlugando()) {
        console.log(`\x1b[31m❌ Cliente ${clienteAlugar.nome} já está alugando um veículo.\x1b[0m`);
      } else if (clienteAlugar.tipoCarteira !== veiculoAlugar.carteiraNecessaria) {
        console.log(`\x1b[31m❌ Veículo ${veiculoAlugar.modelo} requer uma carteira do tipo ${veiculoAlugar.carteiraNecessaria}.\x1b[0m`);
      } else {
        console.log(`\x1b[31m❌ Veículo ${veiculoAlugar.modelo} não está disponível para aluguel para este cliente.\x1b[0m`);
      }
    } else {
      console.log("\x1b[31m❌ Veículo não encontrado.\x1b[0m");
    }
  }

  calcularValorDoAluguel(veiculoAlugado: Veiculo, qtdDiasContratados: number): number {
    const valorDoAluguelPorDia = veiculoAlugado.valorHoraAluguel * 24
    return valorDoAluguelPorDia * qtdDiasContratados
  }

  devolverVeiculo(cpf: string): void {
    const cliente = this.clientes.find((cliente) => cliente.cpf === cpf);
    if (!cliente) {
      console.log("\x1b[31m❌ Cliente não encontrado.\x1b[0m");
      return;
    }

    const aluguel = this.alugueis.find((aluguel) => aluguel.cliente.cpf === cpf && aluguel.dataFim === null);

    if(aluguel){
      aluguel.devolver();
    } else {
      console.log("\x1b[31m❌ Cliente não está alugando um veículo.\x1b[0m");
    }
      // if (veiculo && veiculo.usuario && veiculo.usuario.cpf === cpf) {
      //   if (!veiculo.disponivel) {
      //     veiculo.devolver();
      //     console.log("\x1b[32m✅ Veículo " + placa + " devolvido com sucesso pelo CPF: " + cpf + "\x1b[0m");
      //   } else {
      //     console.log(`\x1b[31m❌ Veículo ${veiculo.modelo} já está disponível.\x1b[0m`);
      //   }
    // } else if (veiculo && !veiculo.usuario) {
    //   console.log("\x1b[31m❌ Veículo " + placa + " não está alugado no momento.\x1b[0m");
    // } else {
    //   console.log("\x1b[31m❌ Veículo " + placa + " não encontrado ou o CPF " + cpf + " não corresponde ao locatário.\x1b[0m");
    // }
  }

  excluirVeiculo(placa: string): void {
    const veiculo = this.veiculos.find((veiculo) => veiculo.placa === placa);

    if (veiculo) {
      if (!veiculo.disponivel) {
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
