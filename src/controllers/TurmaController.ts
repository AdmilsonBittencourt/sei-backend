import { Request, Response } from "express";
import { TurmaService, TurmaValidationError } from "../services/TurmaService"; // Importe o erro

const service = new TurmaService();

export class TurmaController {
  async create(req: Request, res: Response) {
    try {
      const result = await service.create(req.body);
      return res.status(201).json(result);
    } catch (error) {
      if (error instanceof TurmaValidationError) {
        return res.status(400).json({ error: error.message });
      }
      console.error("Controller Error - Create Turma:", error);
      return res.status(500).json({ error: 'Erro interno do servidor ao criar turma.' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await service.update(Number(id), req.body);
      return res.json(result);
    } catch (error) {
      if (error instanceof TurmaValidationError) {
        return res.status(400).json({ error: error.message });
      }
      console.error("Controller Error - Update Turma:", error);
      return res.status(500).json({ error: 'Erro interno do servidor ao atualizar turma.' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await service.delete(Number(id));
      return res.status(204).send();
    } catch (error) {
      // Adicionar tratamento de erro específico se necessário, ex: TurmaNaoEncontradaError
      console.error("Controller Error - Delete Turma:", error);
      return res.status(500).json({ error: 'Erro interno do servidor ao deletar turma.' });
    }
  }

  async reactivate(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await service.reactivate(Number(id));
      return res.json(result);
    } catch (error) {
      // Adicionar tratamento de erro específico se necessário
      console.error("Controller Error - Reactivate Turma:", error);
      return res.status(500).json({ error: 'Erro interno do servidor ao reativar turma.' });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const result = await service.findAll();
      return res.json(result);
    } catch (error) {
      console.error("Controller Error - FindAll Turmas:", error);
      return res.status(500).json({ error: 'Erro interno do servidor ao buscar turmas.' });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await service.findById(Number(id));
      if (!result) {
        return res.status(404).json({ error: 'Turma não encontrada.' });
      }
      return res.json(result);
    } catch (error) {
      console.error("Controller Error - FindById Turma:", error);
      return res.status(500).json({ error: 'Erro interno do servidor ao buscar turma.' });
    }
  }
}
