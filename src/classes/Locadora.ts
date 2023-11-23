import Veiculo from "./veiculo";
import Cliente from "./cliente";

class Locadora {
  private veiculos: Veiculo[] = [];
  private clientes: Cliente[] = [];

  cadastrarVeiculo(veiculo: Veiculo): void {
  
    const veiculoExistente = this.veiculos.find((v) => v.placa === veiculo.placa);

    if (veiculoExistente) {
      console.log(`Veículo com a placa ${veiculo.placa} já está cadastrado.`);
    } else {
      this.veiculos.push(veiculo);
      console.log(`Veículo ${veiculo.modelo} cadastrado com sucesso.`);
    }
  }

  cadastrarCliente(cliente: Cliente): void {
    const clienteExistente = this.clientes.find((c) => c.cpf === cliente.cpf);

    if (clienteExistente) {
      console.log(`Cliente com o CPF ${cliente.cpf} já está cadastrado.`);
    } else {
      this.clientes.push(cliente);
      console.log(`Cliente ${cliente.nome} cadastrado com sucesso.`);
    }
  }

  buscarCliente(cpf: string): Cliente | undefined {
    return this.clientes.find((cliente) => cliente.cpf === cpf);
  }

  listarVeiculosDisponiveis(): void {
    const veiculosDisponiveis = this.veiculos.filter(
      (veiculo) => veiculo.disponivel
    );
    console.log("Veículos disponíveis:");
    veiculosDisponiveis.forEach((veiculo) =>
    console.log(`${veiculo.modelo} - ${veiculo.marca} - ${veiculo.placa}`)
    );
  }

  alugarVeiculo(placa: string, cliente: Cliente ): void {
     
    const veiculoEncontrado = this.veiculos.find(veiculo => veiculo.placa === placa);

    if (veiculoEncontrado) {
      veiculoEncontrado.alugar(cliente);
           
    } else {
      console.log("Veículo não encontrado.");
    }
  }

  devolverVeiculo(placa: string, cpf: string): void {
    const veiculoEncontrado = this.veiculos.find(veiculo => veiculo.placa === placa);
  
    if (veiculoEncontrado && veiculoEncontrado.usuario && veiculoEncontrado.usuario.cpf === cpf) {
      veiculoEncontrado.devolver();
      console.log(`Veiculo ${placa} devolvido com sucesso pelo CPF: ${cpf}`);
    } else if (veiculoEncontrado && !veiculoEncontrado.usuario) {
      console.log(`Veiculo ${placa} não está alugado no momento.`);
    } else {
      console.log(`Veiculo ${placa} não encontrado ou o CPF ${cpf} nao corresponde ao locatario.`);
    }
  }

  excluirVeiculo(placa: string): void {
    const veiculoEncontrado = this.veiculos.find(veiculo => veiculo.placa === placa);
    
    if (veiculoEncontrado) {
      if (!veiculoEncontrado.disponivel) {
        console.log("Veiculo está sendo usado e nao pode ser excluido!");
      } else {
        this.veiculos = this.veiculos.filter(veiculo => veiculo.placa !== placa);
        console.log(`Veiculo ${placa} removido com sucesso.`);
      }
    } else {
      console.log("Veiculo nao encontrado!");
    }
  }  
}

export default Locadora;