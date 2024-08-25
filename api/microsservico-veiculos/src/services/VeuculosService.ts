import { AppDataSource } from "../database/db";
import kafka from "../config/kafka";
import { Veiculos } from "../models/Veiculos";
class VeiculoService {
    private veiculoRepository = AppDataSource.getRepository(Veiculos);
  
    async salvarVeiculo(veiculoData: Partial<Veiculos>): Promise<Veiculos | null> {
        try {
            const novoVeiculo = this.veiculoRepository.create(veiculoData);
            const veiculoSalvo = await this.veiculoRepository.save(novoVeiculo);
            
            await kafka.sendMessage('veiculo_cadastrado', { veiculo: veiculoSalvo });

            return veiculoSalvo;
        } catch (error) {
            console.error('Erro ao salvar o veículo:', error);
            throw new Error('Houve um Erro Interno no Servidor');
        }
    }
    
    async listarVeiculos(): Promise<Veiculos[]> {
        try {
            return await this.veiculoRepository.find();
        } catch (error) {
            console.error('Erro ao listar os veículos:', error);
            throw new Error('Houve um Erro Interno no Servidor');
        }
    }
}

export default new VeiculoService();
