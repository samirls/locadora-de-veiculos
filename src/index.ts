import Cliente from "./classes/Cliente";
import Veiculo from "./classes/Veiculo";
import Locadora from "./classes/Locadora";
import * as readlineSync from "readline-sync";

// CLI - Command Line Interface //////////////////////////////////////////////////////
const locadora = new Locadora();

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
  console.log("4 - Alugar Veículo");
  console.log("5 - Devolver Veículo");
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
      alugarVeiculo();
      break;
    case 5:
      devolverVeiculo();
      break;
    default:
      console.log("\x1b[31mSaindo do aplicativo.\x1b[0m");
  }
}

function cadastrarVeiculo() {
  let placa: string = readlineSync.question("Digite a placa: ");
  let modelo: string = readlineSync.question("Digite o modelo: ");
  let marca: string = readlineSync.question("Digite a marca: ");
  let valorHoraAluguel: number = parseInt(readlineSync.question("Digite o valor da hora de aluguel: "));
  let carteiraNecessaria: string = readlineSync.question("Digite a habilitação necessária para conduzir o veículo, se A ou B: ");
  
  const veiculo = new Veiculo(
    placa,
    modelo,
    marca,
    valorHoraAluguel,
    true,
    null,
    carteiraNecessaria
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

  const cliente = locadora.buscarCliente(cpfCliente);

  if (cliente) {
    locadora.alugarVeiculo(placa, cliente);
  } else {
    console.log("\x1b[31mCliente com o CPF " + cpfCliente + " não encontrado.\x1b[0m");
  }

  main();
}

function cadastrarCliente() {
  let nome: string = readlineSync.question("Digite o nome do cliente: ");
  let cpf: string = readlineSync.question("Digite o CPF do cliente: ");
  let tipoCarteira: string = readlineSync.question("Digite a categoria da carteira do cliente: ");

  const cliente = new Cliente(nome, cpf, tipoCarteira);
  locadora.cadastrarCliente(cliente);
  console.log(`\x1b[32mCliente cadastrado com sucesso: ${nome} - ${cpf}\x1b[0m`);
  main();
}

function devolverVeiculo() {
  let placa: string = readlineSync.question("Digite a placa do veículo a ser devolvido: ");
  let cpfCliente: string = readlineSync.question("Digite o CPF do cliente que está devolvendo: ");

  locadora.devolverVeiculo(placa, cpfCliente);
  main();
}

main();
