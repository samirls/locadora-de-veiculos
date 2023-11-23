import Cliente from "./classes/Cliente";
import Veiculo from "./classes/Veiculo";
import Locadora from "./classes/Locadora";
import * as readlineSync from "readline-sync";
import Aluguel from "./classes/aluguel";

// CLI - Command Line Interface //////////////////////////////////////////////////////
const locadora = new Locadora();

locadora.cadastrarVeiculo(new Veiculo("AAA1234", "Sedan", "Fiat", 100, true, "A"));
locadora.cadastrarVeiculo(new Veiculo("BBB1234", "Uno", "Fiat", 100, true, "A"));
locadora.cadastrarVeiculo(new Veiculo("CCC1234", "Palio", "Fiat", 100, true, "A"));

locadora.cadastrarCliente(new Cliente("João", "11111111111", "A"));
locadora.cadastrarCliente(new Cliente("Maria", "22222222222", "A"));
locadora.cadastrarCliente(new Cliente("José", "33333333333", "A"));

locadora.alugarVeiculo("AAA1234", "11111111111");
locadora.alugarVeiculo("BBB1234", "22222222222");
locadora.alugarVeiculo("CCC1234", "33333333333");

function main(): void {
  console.log(`
    \x1b[36m################################################################
    ################## Sistema Locação de Veículos #################
    ################################################################\x1b[0m
    `);
  console.log("\x1b[33mEscolha uma opção:");
  console.log("1 - Cadastrar Veículo");
  console.log("2 - Cadastrar Cliente");
  console.log("3 - Listar Veículos");
  console.log("4 - Listar Clientes")
  console.log("5 - Listar Aluguéis");
  console.log("6 - Alugar Veículo");
  console.log("7 - Devolver Veículo");
  console.log("Pressione qualquer outra tecla para sair da aplicação.\x1b[0m");

  let userInput: number = parseInt(readlineSync.question("Digite: "));

  switch (userInput) {
    case 1:
      cadastrarVeiculo();
      break;
    case 2:
      cadastrarCliente();
      break;
    case 3:
      listarVeiculosDisponiveis();
      break;
    case 4: 
      listarClientes();
      break;
    case 5:
      listarAlugueis();
      break;
    case 6:
      alugarVeiculo();
      break;
    case 7:
      devolverVeiculo();
      break;  
    default:
      console.log("\x1b[31mSaindo do aplicativo.\x1b[0m");
  }
}

function cadastrarVeiculo() {
  let placa: string = readlineSync.question("Digite a placa: (ex: AAA1234) ");
  let modelo: string = readlineSync.question("Digite o modelo: (ex: Sedan) ");
  let marca: string = readlineSync.question("Digite a marca: (ex: Fiat) ");
  let valorHoraAluguel: number = parseInt(readlineSync.question("Digite o valor da hora de aluguel: "));
  let carteiraNecessaria: string = readlineSync.question("Digite a habilitação necessária para conduzir o veículo, se A ou B: ");
  
  const veiculo = new Veiculo(
    placa.toUpperCase(),
    modelo,
    marca,
    valorHoraAluguel,
    true,
    carteiraNecessaria.toUpperCase()
  );
  locadora.cadastrarVeiculo(veiculo);
  console.log(`\x1b[32mVeículo cadastrado com sucesso: ${modelo} - ${placa}\x1b[0m`);
  main();
}

function listarVeiculosDisponiveis() {
  locadora.listarVeiculosDisponiveis();
  main();
}

function alugarVeiculo() {
  let placa: string = readlineSync.question("Digite a placa: ");
  let cpfCliente: string = readlineSync.question("Digite o CPF do cliente: ");
  let qtdDiasContratados: string = readlineSync.question("Digite a quantidade de dias que deseja alugar: ");

  const cliente = locadora.buscarCliente(cpfCliente);

  if (cliente) {
    locadora.alugarVeiculo(placa.toUpperCase(), cliente.cpf);

  } else {
    console.log("\x1b[31mCliente com o CPF " + cpfCliente + " não encontrado.\x1b[0m");
  }

  main();
}

function cadastrarCliente() {
  let nome: string = readlineSync.question("Digite o nome do cliente: ");
  let cpf: string = readlineSync.question("Digite o CPF do cliente: ");
  let tipoCarteira: string = readlineSync.question("Digite a categoria da carteira do cliente: ");

  const cliente = new Cliente(nome, cpf, tipoCarteira.toUpperCase());
  locadora.cadastrarCliente(cliente);
  main();
}

function devolverVeiculo() {
  // let placa: string = readlineSync.question("Digite a placa do veículo a ser devolvido: ");
  let cpfCliente: string = readlineSync.question("Digite o CPF do cliente que está devolvendo: ");

  locadora.devolverVeiculo(cpfCliente);
  main();
}

function listarClientes() {
  locadora.listarClientes();
  main();
}

function listarAlugueis() {
  locadora.listarAlugueis();
  main();
}

main();
