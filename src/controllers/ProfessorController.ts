import { Request, Response } from "express";
import { ProfessorService } from "../services/ProfessorService";

const service = new ProfessorService;

export class ProfessorController {
    
  async create(req: Request, res: Response) {
    const result = await service.create(req.body);
    return res.status(201).json(result);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const result = await service.update(Number(id), req.body);
    return res.json(result);
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
