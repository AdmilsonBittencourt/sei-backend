import { ProfessorRepository } from "../repositories/ProfessorRepository";
import { Professor } from "../entities/Professor";

export class ProfessorService {
  async create(data: Partial<Professor>) {
    const professor = ProfessorRepository.create(data);
    return await ProfessorRepository.save(professor);
  }

  async update(id: number, data: Partial<Professor>) {
    await ProfessorRepository.update(id, data);
    return await ProfessorRepository.findOneBy({ id });
  }

  async delete(id: number) {
    return await ProfessorRepository.update(id, { ativo: false });
  }

  async reactivate(id: number) {
    return await ProfessorRepository.update(id, { ativo: true });
  }

  async findAll() {
    return await ProfessorRepository.find();
  }

  async findById(id: number) {
    return await ProfessorRepository.findOneBy({ id });
  }
}
