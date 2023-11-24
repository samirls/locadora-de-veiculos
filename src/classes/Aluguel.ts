import Cliente from "./Cliente";
import Veiculo from "./veiculo";

class Aluguel {

    private _valorHoraContratado: number = this._veiculo.valorHoraAluguel
    private _dataInicio: Date = new Date()

    constructor(
        private _veiculo: Veiculo,
        private _cliente: Cliente,
        private _dataFim: Date | null = null,
    ) {
        _veiculo.disponivel = false;
        _cliente.alugando = this.veiculo;
    }

    get veiculo() {
        return this._veiculo;
    }

    get dataInicio() {
        return this._dataInicio;
    }

    get dataFim() {
        return this._dataFim;
    }

    get valor() {
        return this._valorHoraContratado;
    }

    get cliente() {
        return this._cliente;
    }

    calcularValorFinal() : number | string{
        if (this._dataFim === null) {
            return "Aluguel ainda em andamento.";
        }
        const diferencaEmHoras = Math.abs(this._dataFim.getTime() - this._dataInicio.getTime()) / 36e5;
        if (diferencaEmHoras < 24) {
            return this._valorHoraContratado * 24;
        }
        const valorFinal = diferencaEmHoras * this._valorHoraContratado;

        return valorFinal;
    }

    gerarFatura(): string {
        if (this._dataFim === null) {
            return "Aluguel ainda em andamento.";
        }
        const dataInicio = this._dataInicio.getDate() + "/" + (this._dataInicio.getMonth() + 1) + "/" + this._dataInicio.getFullYear();
        const dataFim = this._dataFim.getDate() + "/" + (this._dataFim.getMonth() + 1) + "/" + this._dataFim.getFullYear();
        const horasUtilizadas = Math.abs(this._dataFim.getTime() - this._dataInicio.getTime()) / 36e5;
        const valorTotal = this.calcularValorFinal();

        return `
            Cliente: ${this._cliente.nome}
            Veiículo: ${this._veiculo.modelo}
            Data de início: ${dataInicio}
            Data de fim: ${dataFim}
            Valor da hora: ${this._valorHoraContratado}R$
            Horas Utilizadas: ${horasUtilizadas < 1 ? '1' : horasUtilizadas.toFixed(2)}
            ${horasUtilizadas < 24 ? '\x1b[3mValor mínimo de uma diária cobrado\x1b[0m' : ''}
            Valor total: ${valorTotal}R$
        `;
    }

    devolver(): void {
        if (this._dataFim !== null) {
            console.log("\x1b[31m❌ Este veículo já foi devolvido.\x1b[0m");
            return;
        }
        this._dataFim = new Date();
        this._veiculo.disponivel = true;
        this._cliente.alugando = null;
        console.log(this.gerarFatura());
        console.log("\x1b[32m✅ Veículo " + this._veiculo.placa + " devolvido com sucesso pelo CPF: " + this._cliente.cpf + "\x1b[0m");
    }
}

export default Aluguel;