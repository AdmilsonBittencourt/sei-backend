import { Request, Response } from "express";
import { LocalSalaService, LocalSalaValidationError } from "../services/LocalSalaService";

const service = new LocalSalaService;

export class LocalSalaController {
  async create(req: Request, res: Response) {
    try {
      const result = await service.create(req.body);
      return res.status(201).json(result);
    } catch (error) {
      if (error instanceof LocalSalaValidationError) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await service.update(Number(id), req.body);
      return res.json(result);
    } catch (error) {
      if (error instanceof LocalSalaValidationError) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    await service.delete(Number(id));
    return res.status(204).send();
  }

  async reactivate(req: Request, res: Response) {
    const { id } = req.params;
    const result = await service.reactivate(Number(id));
    return res.json(result);
  }

  async findAll(req: Request, res: Response) {
    const result = await service.findAll();
    return res.json(result);
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;
    const result = await service.findById(Number(id));
    return res.json(result);
  }
}
