import { DisciplinaRepository } from "../repositories/DisciplinaRepository";
import { Disciplina } from "../entities/Disciplina";

export class DisciplinaValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DisciplinaValidationError';
  }
}

export class DisciplinaService {
  private async validateUniqueFields(data: Partial<Disciplina>, excludeId?: number) {
    const conditions = [];
    
    if (data.nome) {
      conditions.push({ nome: data.nome });
    }
    if (data.codigo) {
      conditions.push({ codigo: data.codigo });
    }

    if (conditions.length === 0) return;

    const existingDisciplina = await DisciplinaRepository.findOne({
      where: conditions
    });

    if (existingDisciplina && (!excludeId || existingDisciplina.id !== excludeId)) {
      if (existingDisciplina.nome === data.nome) {
        throw new DisciplinaValidationError('O nome informado já está em uso por outra disciplina');
      }
      if (existingDisciplina.codigo === data.codigo) {
        throw new DisciplinaValidationError('O código informado já está em uso por outra disciplina');
      }
    }
  }

  async create(data: Partial<Disciplina>) {
    try {
      await this.validateUniqueFields(data);
      const disciplina = DisciplinaRepository.create(data);
      return await DisciplinaRepository.save(disciplina);
    } catch (error) {
      if (error instanceof DisciplinaValidationError) {
        throw error;
      }
      throw new DisciplinaValidationError('Erro ao criar disciplina');
    }
  }

  async update(id: number, data: Partial<Disciplina>) {
    try {
      const currentDisciplina = await DisciplinaRepository.findOneBy({ id });
      if (!currentDisciplina) {
        throw new DisciplinaValidationError('Disciplina não encontrada');
      }

      await this.validateUniqueFields(data, id);
      await DisciplinaRepository.update(id, data);
      return await DisciplinaRepository.findOneBy({ id });
    } catch (error) {
      if (error instanceof DisciplinaValidationError) {
        throw error;
      }
      throw new DisciplinaValidationError('Erro ao atualizar disciplina');
    }
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
