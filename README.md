<h3>Locadora de Veículos</h3>
<p>Programação Orientada a Objetos e Typescript</p>

Desenvolvimento de Sistema para Locadora de Veículos

Contexto e Requisitos

Regras de Negócio Estabelecidas pelo Cliente

Cadastro de Veículos:
1. Não é permitido cadastrar veículos com a mesma placa de outro já registrado no sistema.
2. As informações a serem cadastradas dos veículos devem incluir o valor da hora de aluguel.

Aluguel de Veículos:
1. Para alugar um veículo, o cliente deve fornecer nome, CPF e o tipo de carteira. ok
2. Se o tipo de carteira do cliente for "A", ele só poderá alugar uma moto; se for "B", apenas um
carro. ok

3. Cada cliente pode alugar apenas um veículo por vez, e não deve estar alugando nenhum outro
veículo no momento de realizar um novo aluguel. ok

4. Ao alugar um veículo, deve-se realizar um cálculo considerando o valor da diária, os dias a serem
alugados e um acréscimo conforme o tipo de veículo. Carros terão um acréscimo de 10%,
enquanto motos terão 5%.

Devolução de Veículos:
1. A devolução do veículo requer o fornecimento do CPF do cliente e a placa do veículo. ok
2. Não é permitido excluir um veículo que esteja atualmente alugado. ok

Faturamento:
1. O sistema, quando solicitado, deve apresentar a fatura a ser paga pelo cliente, detalhando o
custo do aluguel de cada veículo.

Funcionalidades do Sistema
1. Cadastrar veículo
2. Alugar veículo
3. Devolver veículo
4. Listar veículos disponíveis
5. Listar veículos alugados
6. Mostrar fatura do cliente
7. Sair do sistema