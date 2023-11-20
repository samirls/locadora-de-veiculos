class Cliente {
  constructor(
    public nome: string,
    public cpf: string,
    public tipoCarteira: string
  ) {}
}

class Veiculo {
  constructor(
    public placa: string,
    public modelo: string,
    public marca: string,
    public valorHoraAluguel: number,
    public disponivel: boolean = true
  ) {}

  alugar(): void {
    if (this.disponivel) {
      this.disponivel = false;
      console.log(`Veículo ${this.modelo} alugado com sucesso.`);
    } else {
      console.log(`Veículo ${this.modelo} não está disponível para aluguel.`);
    }
  }

  devolver(): void {
    if (!this.disponivel) {
      this.disponivel = true;
      console.log(`Veículo ${this.modelo} devolvido com sucesso.`);
    } else {
      console.log(`Veículo ${this.modelo} já está disponível.`);
    }
  }
}

class Locadora {
  private veiculos: Veiculo[] = [];

  cadastrarVeiculo(veiculo: Veiculo): void {
    let veiculoExistente = false;

    for (const v of this.veiculos) {
      if (v.placa === veiculo.placa) {
        veiculoExistente = true;
        break;
      }
    }

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

  alugarVeiculo(placa: string): void {
    let veiculoEncontrado: Veiculo | undefined;

    for (const veiculo of this.veiculos) {
      if (veiculo.placa === placa) {
        veiculoEncontrado = veiculo;
        break;
      }
    }

    if (veiculoEncontrado) {
      veiculoEncontrado.alugar();
    } else {
      console.log("Veículo não encontrado.");
    }
  }

  devolverVeiculo(placa: string): void {
    let veiculoEncontrado: Veiculo | undefined;

    for (const veiculo of this.veiculos) {
      if (veiculo.placa === placa) {
        veiculoEncontrado = veiculo;
        break;
      }
    }

    if (veiculoEncontrado) {
      veiculoEncontrado.devolver();
    } else {
      console.log("Veículo não encontrado.");
    }
  }
}

// Exemplo de uso //////////////////////////////////////////////////////
const locadora = new Locadora();

const carro1 = new Veiculo("PPX-5487", "Civic", "Honda", 10);
const carro2 = new Veiculo("LLD-5391", "Corolla", "Toyota", 11);
const carro3 = new Veiculo("YWK-1223", "Uno", "Fiat", 8);
const carro4 = new Veiculo("PPX-5487", "Civic", "Honda", 10);

locadora.cadastrarVeiculo(carro1);
locadora.cadastrarVeiculo(carro2);
locadora.cadastrarVeiculo(carro3);
locadora.cadastrarVeiculo(carro4);

locadora.listarVeiculosDisponiveis();

locadora.alugarVeiculo("PPX-5487");
locadora.alugarVeiculo("LLD-5391");
locadora.alugarVeiculo("YWK-1223");

locadora.listarVeiculosDisponiveis();

locadora.devolverVeiculo("1");
locadora.devolverVeiculo("PPX-5487");

locadora.listarVeiculosDisponiveis();
