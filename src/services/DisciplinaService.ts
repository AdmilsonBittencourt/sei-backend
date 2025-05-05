import { DisciplinaRepository } from "../repositories/DisciplinaRepository";
import { Disciplina } from "../entities/Disciplina";

export class DisciplinaService {
  async create(data: Partial<Disciplina>) {
    const disciplina = DisciplinaRepository.create(data);
    return await DisciplinaRepository.save(disciplina);
  }

  async update(id: number, data: Partial<Disciplina>) {
    await DisciplinaRepository.update(id, data);
    return await DisciplinaRepository.findOneBy({ id });
  }

  async delete(id: number) {
    return await DisciplinaRepository.update(id, { ativo: false });
  }

  async reactivate(id: number) {
    return await DisciplinaRepository.update(id, { ativo: true });
  }

  async findAll() {
    return await DisciplinaRepository.find();
  }

  async findById(id: number) {
    return await DisciplinaRepository.findOneBy({ id });
  }
}
