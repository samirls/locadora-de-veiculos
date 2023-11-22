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
class Veiculo {
  constructor(
    public placa: string,
    public modelo: string,
    public marca: string,
    public valorHoraAluguel: number,
    public disponivel: boolean = true,
    public usuario: Cliente | null = null,
    public carteiraNecessario: string
  ) {}

  alugar(cliente: Cliente): void {
    if (this.disponivel && !this.usuario && cliente.tipoCarteira === this.carteiraNecessario && !cliente.estaAlugando()) {
      this.disponivel = false;
      this.usuario = cliente;
      cliente.alugando = this; // Atualiza o veículo alugado pelo cliente
      console.log(`Veículo ${this.modelo} alugado por ${this.usuario.nome} com sucesso.`);
    } else if (this.usuario) {
      console.log(`Veículo ${this.modelo} está sendo usado por ${this.usuario.nome}.`);
    } else if (cliente.estaAlugando()) {
      console.log(`Cliente ${cliente.nome} já está alugando um veículo.`);
    } else if (cliente.tipoCarteira !== this.carteiraNecessario) {
      console.log(`Veículo ${this.modelo} requer uma carteira do tipo ${this.carteiraNecessario}.`);
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

  alugarVeiculo(placa: string, cliente: Cliente): void { 
    let veiculoEncontrado: Veiculo | undefined;

    for (const veiculo of this.veiculos) {
      if (veiculo.placa === placa) {
        veiculoEncontrado = veiculo;
        break;
      }
    }

    if (veiculoEncontrado) {
      veiculoEncontrado.alugar(cliente); 
    } else {
      console.log("Veículo não encontrado.");
    }
  }

  devolverVeiculo(placa: string): void {
    const veiculoEncontrado = this.veiculos.find(veiculo => veiculo.placa === placa);
 
    if (veiculoEncontrado) {
      veiculoEncontrado.devolver();
    } else {
      console.log("Veículo não encontrado.");
    }
  }
}

// Exemplo de uso //////////////////////////////////////////////////////
const locadora = new Locadora();

const veiculo1 = new Veiculo("PPX-5487", "Civic", "Honda", 10, true, null, "B");
const veiculo2 = new Veiculo("LLD-5391", "Corolla", "Toyota", 11, true, null, "B");
const veiculo3 = new Veiculo("YWK-1223", "Uno", "Fiat", 8, true, null, "B");
const veiculo4 = new Veiculo("OUTRA-PLACA", "Civic", "Honda", 10, true, null, "B");
const veiculo5 = new Veiculo("BRA-49CC", "Sahara 300", "Honda", 5, true, null, "A");

locadora.cadastrarVeiculo(veiculo1);
locadora.cadastrarVeiculo(veiculo2);
locadora.cadastrarVeiculo(veiculo3);
locadora.cadastrarVeiculo(veiculo4);
locadora.cadastrarVeiculo(veiculo5);

locadora.listarVeiculosDisponiveis();

const cliente1 = new Cliente("João", "12345678900", "A");
const cliente2 = new Cliente("Maria", "98765432100", "B");

locadora.alugarVeiculo("PPX-5487",cliente1);
locadora.alugarVeiculo("LLD-5391",cliente2); 
locadora.alugarVeiculo("YWK-1223",cliente1);


locadora.listarVeiculosDisponiveis();

locadora.devolverVeiculo("1");
locadora.devolverVeiculo("PPX-5487");

locadora.listarVeiculosDisponiveis();
