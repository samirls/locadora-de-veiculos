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
  console.log("3 - Listar Veículos Disponíveis");
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

function checkPlaca(placa: string): boolean {
  if (!/^[A-Z]{3}\d{4}$/.test(placa)) {
    console.log("\x1b[31m❌ Placa inválida.\x1b[0m")
    return false;
  }
  return true;
}

function checkCpf(cpf: string): boolean {
  if (!/^\d{11}$/.test(cpf)) {
    console.log("\x1b[31m❌ CPF inválido.\x1b[0m");
    return false;
  }
  return true;
}

function cadastrarVeiculo() {
  let placa: string = readlineSync.question("Digite a placa: (ex: AAA1234) ");
  if (!checkPlaca(placa)) {
    main();
  }
  let modelo: string = readlineSync.question("Digite o modelo: (ex: Sedan) ");
  let marca: string = readlineSync.question("Digite a marca: (ex: Fiat) ");
  let valorHoraAluguel: number = parseInt(readlineSync.question("Digite o valor da hora de aluguel: "));
  let carteiraNecessaria: string = readlineSync.question("Digite a habilitação necessária para conduzir o veículo, se A ou B: ");
  
  carteiraNecessaria = carteiraNecessaria.toUpperCase();
  if (carteiraNecessaria !== "A" && carteiraNecessaria !== "B") {
    console.log("\x1b[31m❌ Carteira necessária inválida.\x1b[0m");
    main();
  }
  
  if (placa && modelo && marca && valorHoraAluguel && carteiraNecessaria) {
    const veiculo = new Veiculo(
      placa.toUpperCase(),
      modelo,
      marca,
      valorHoraAluguel,
      true,
      carteiraNecessaria
    );
    locadora.cadastrarVeiculo(veiculo);
    console.log(`\x1b[32mVeículo cadastrado com sucesso: ${modelo} - ${placa}\x1b[0m`);
    main();
  } else {
    console.log("\x1b[31m❌ Informações inválidas.\x1b[0m");
    main();
  }
}

function listarVeiculosDisponiveis() {
  locadora.listarVeiculosDisponiveis();
  main();
}

function alugarVeiculo() {
  let placa: string = readlineSync.question("Digite a placa: ");
  if (!checkPlaca(placa)) {
    main();
  }
  let cpfCliente: string = readlineSync.question("Digite o CPF do cliente: ");
  if (!checkCpf(cpfCliente)) {
    main();
  }
  let qtdDiasContratados: string = readlineSync.question("Digite a quantidade de dias que deseja alugar: ");
  
  locadora.alugarVeiculo(placa.toUpperCase(), cpfCliente);
  main();
}

function cadastrarCliente() {
  let nome: string = readlineSync.question("Digite o nome do cliente: ");
  if (nome.length < 3) {
    console.log("\x1b[31m❌ Nome inválido.\x1b[0m");
    main();
  }

  let cpf: string = readlineSync.question("Digite o CPF do cliente (XXXYYYZZZYY) sem pontuação: ");
  if (!checkCpf(cpf)) {
    main();
  }

  let tipoCarteira: string = readlineSync.question("Digite a categoria da carteira do cliente: ");
  if(tipoCarteira.toUpperCase() !== "A" && tipoCarteira.toUpperCase() !== "B") {
    console.log("\x1b[31m❌ Carteira inválida.\x1b[0m");
    main();
  }

  if (nome && cpf && tipoCarteira) {
    const cliente = new Cliente(nome, cpf, tipoCarteira.toUpperCase());
    locadora.cadastrarCliente(cliente);
    main();
  }
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
