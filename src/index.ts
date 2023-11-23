import Cliente from './classes/Cliente';
import Veiculo from './classes/Veiculo';
import Locadora from './classes/Locadora';




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

locadora.excluirVeiculo("LLD-5391");


locadora.listarVeiculosDisponiveis();

locadora.devolverVeiculo("PPX-5487",cliente1.cpf); // Aponta como não alugado (correto)
locadora.devolverVeiculo("YWK-1223",cliente2.cpf); // Aponta como não alugado (correto)
locadora.devolverVeiculo("LLD-5391",cliente2.cpf); // Devolve com sucesso (correto)

locadora.listarVeiculosDisponiveis();


// CLI - Command Line Interface //////////////////////////////////////////////////////