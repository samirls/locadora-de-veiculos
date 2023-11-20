var Veiculo = /** @class */ (function () {
    function Veiculo(placa, modelo, marca, valorHoraAluguel, disponivel) {
        if (disponivel === void 0) { disponivel = true; }
        this.placa = placa;
        this.modelo = modelo;
        this.marca = marca;
        this.valorHoraAluguel = valorHoraAluguel;
        this.disponivel = disponivel;
    }
    Veiculo.prototype.alugar = function () {
        if (this.disponivel) {
            this.disponivel = false;
            console.log("Ve\u00EDculo ".concat(this.modelo, " alugado com sucesso."));
        }
        else {
            console.log("Ve\u00EDculo ".concat(this.modelo, " n\u00E3o est\u00E1 dispon\u00EDvel para aluguel."));
        }
    };
    Veiculo.prototype.devolver = function () {
        if (!this.disponivel) {
            this.disponivel = true;
            console.log("Ve\u00EDculo ".concat(this.modelo, " devolvido com sucesso."));
        }
        else {
            console.log("Ve\u00EDculo ".concat(this.modelo, " j\u00E1 est\u00E1 dispon\u00EDvel."));
        }
    };
    return Veiculo;
}());
var Locadora = /** @class */ (function () {
    function Locadora() {
        this.veiculos = [];
    }
    Locadora.prototype.cadastrarVeiculo = function (veiculo) {
        var veiculoExistente = false;
        for (var _i = 0, _a = this.veiculos; _i < _a.length; _i++) {
            var v = _a[_i];
            if (v.placa === veiculo.placa) {
                veiculoExistente = true;
                break;
            }
        }
        if (veiculoExistente) {
            console.log("Ve\u00EDculo com a placa ".concat(veiculo.placa, " j\u00E1 est\u00E1 cadastrado."));
        }
        else {
            this.veiculos.push(veiculo);
            console.log("Ve\u00EDculo ".concat(veiculo.modelo, " cadastrado com sucesso."));
        }
    };
    Locadora.prototype.listarVeiculosDisponiveis = function () {
        var veiculosDisponiveis = this.veiculos.filter(function (veiculo) { return veiculo.disponivel; });
        console.log("Veículos disponíveis:");
        veiculosDisponiveis.forEach(function (veiculo) {
            return console.log("".concat(veiculo.modelo, " - ").concat(veiculo.marca, " - ").concat(veiculo.placa));
        });
    };
    Locadora.prototype.alugarVeiculo = function (placa) {
        var veiculoEncontrado;
        for (var _i = 0, _a = this.veiculos; _i < _a.length; _i++) {
            var veiculo = _a[_i];
            if (veiculo.placa === placa) {
                veiculoEncontrado = veiculo;
                break;
            }
        }
        if (veiculoEncontrado) {
            veiculoEncontrado.alugar();
        }
        else {
            console.log("Veículo não encontrado.");
        }
    };
    Locadora.prototype.devolverVeiculo = function (placa) {
        var veiculoEncontrado;
        for (var _i = 0, _a = this.veiculos; _i < _a.length; _i++) {
            var veiculo = _a[_i];
            if (veiculo.placa === placa) {
                veiculoEncontrado = veiculo;
                break;
            }
        }
        if (veiculoEncontrado) {
            veiculoEncontrado.devolver();
        }
        else {
            console.log("Veículo não encontrado.");
        }
    };
    return Locadora;
}());
// Exemplo de uso //////////////////////////////////////////////////////
var locadora = new Locadora();
var carro1 = new Veiculo("PPX-5487", "Civic", "Honda", 10);
var carro2 = new Veiculo("LLD-5391", "Corolla", "Toyota", 11);
var carro3 = new Veiculo("YWK-1223", "Uno", "Fiat", 8);
var carro4 = new Veiculo("PPX-5487", "Civic", "Honda", 10);
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
locadora.listarVeiculosDisponiveis();
