import Locadora from "./Locadora";

class Veiculo {
  constructor(
    public placa: string,
    public modelo: string,
    public marca: string,
    public valorHoraAluguel: number,
    public disponivel: boolean = true,
    public carteiraNecessaria: string
    ) { }
}

export default Veiculo;
