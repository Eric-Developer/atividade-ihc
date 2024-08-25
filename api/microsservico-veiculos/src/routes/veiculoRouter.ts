import { Router, Request, Response } from "express";
import VeuculosService from "../services/VeuculosService";

const veiculoRouter = Router();

// Rota para cadastrar um novo veículo
veiculoRouter.post("/novo-veiculo", async (req: Request, res: Response) => {
    try {
        const veiculoData = req.body;
        const novoVeiculo = await VeuculosService.salvarVeiculo(veiculoData);
        
        if (novoVeiculo) {
            res.status(201).json(novoVeiculo);
        } else {
            res.status(400).json({ message: "Não foi possível cadastrar o veículo." });
        }
    } catch (error) {
        console.error('Erro ao cadastrar o veículo:', error);
        res.status(500).json({ message: "Houve um erro interno no servidor." });
    }
});

// Rota para listar todos os veículos
veiculoRouter.get("/veiculos", async (req: Request, res: Response) => {
    try {
        const veiculos = await VeuculosService.listarVeiculos();
        res.status(200).json(veiculos);
    } catch (error) {
        console.error('Erro ao listar os veículos:', error);
        res.status(500).json({ message: "Houve um erro interno no servidor." });
    }
});

export default veiculoRouter;
