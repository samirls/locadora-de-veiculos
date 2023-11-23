import Veiculo from "./veiculo";
import Cliente from "./cliente";

class Locadora {
  private veiculos: Veiculo[] = [];

  cadastrarVeiculo(veiculo: Veiculo): void {
  
    const veiculoExistente = this.veiculos.find((v) => v.placa === veiculo.placa);

    if (veiculoExistente) {
      console.log(`Veículo com a placa ${veiculo.placa} já está cadastrado.`);
    } else {
      this.veiculos.push(veiculo);
      console.log(`Veículo ${veiculo.modelo} cadastrado com sucesso.`);
    }
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
      console.log(`Veículo ${placa} devolvido com sucesso pelo CPF: ${cpf}`);
    } else if (veiculoEncontrado && !veiculoEncontrado.usuario) {
      console.log(`Veículo ${placa} não está alugado no momento.`);
    } else {
      console.log(`Veículo ${placa} não encontrado ou o CPF ${cpf} não corresponde ao locatário.`);
    }
  }

  excluirVeiculo(placa: string): void {
    const veiculoEncontrado = this.veiculos.find(veiculo => veiculo.placa === placa);
    
    if (veiculoEncontrado) {
      if (!veiculoEncontrado.disponivel) {
        console.log("Veículo está sendo usado e não pode ser excluído!");
      } else {
        this.veiculos = this.veiculos.filter(veiculo => veiculo.placa !== placa);
        console.log(`Veículo ${placa} removido com sucesso.`);
      }
    } else {
      console.log("Veículo não encontrado!");
    }
  }  
}

export default Locadora;