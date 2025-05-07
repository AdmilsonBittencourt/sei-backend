import { ProfessorRepository } from "../repositories/ProfessorRepository";
import { Professor } from "../entities/Professor";

export class ProfessorValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ProfessorValidationError';
  }
}

export class ProfessorService {
  private async validateUniqueFields(data: Partial<Professor>, excludeId?: number) {
    const conditions = [];
    
    if (data.email) {
      conditions.push({ email: data.email });
    }
    if (data.CPF) {
      conditions.push({ CPF: data.CPF });
    }
    if (data.telefone) {
      conditions.push({ telefone: data.telefone });
    }

    if (conditions.length === 0) return;

    const existingProfessor = await ProfessorRepository.findOne({
      where: conditions
    });

    if (existingProfessor && (!excludeId || existingProfessor.id !== excludeId)) {
      if (existingProfessor.email === data.email) {
        throw new ProfessorValidationError('O email informado já está em uso por outro professor');
      }
      if (existingProfessor.CPF === data.CPF) {
        throw new ProfessorValidationError('O CPF informado já está em uso por outro professor');
      }
      if (existingProfessor.telefone === data.telefone) {
        throw new ProfessorValidationError('O telefone informado já está em uso por outro professor');
      }
    }
  }

  async create(data: Partial<Professor>) {
    try {
      await this.validateUniqueFields(data);
      const professor = ProfessorRepository.create(data);
      return await ProfessorRepository.save(professor);
    } catch (error) {
      if (error instanceof ProfessorValidationError) {
        throw error;
      }
      throw new ProfessorValidationError('Erro ao criar professor');
    }
  }

  async update(id: number, data: Partial<Professor>) {
    try {
      const currentProfessor = await ProfessorRepository.findOneBy({ id });
      if (!currentProfessor) {
        throw new ProfessorValidationError('Professor não encontrado');
      }

      await this.validateUniqueFields(data, id);
      await ProfessorRepository.update(id, data);
      return await ProfessorRepository.findOneBy({ id });
    } catch (error) {
      if (error instanceof ProfessorValidationError) {
        throw error;
      }
      throw new ProfessorValidationError('Erro ao atualizar professor');
    }
  }

  async delete(id: number) {
    try {
      const professor = await ProfessorRepository.findOneBy({ id });
      if (!professor) {
        throw new ProfessorValidationError('Professor não encontrado');
      }
      return await ProfessorRepository.update(id, { ativo: false });
    } catch (error) {
      if (error instanceof ProfessorValidationError) {
        throw error;
      }
      throw new ProfessorValidationError('Erro ao deletar professor');
    }
  }

  async reactivate(id: number) {
    try {
      const professor = await ProfessorRepository.findOneBy({ id });
      if (!professor) {
        throw new ProfessorValidationError('Professor não encontrado');
      }
      return await ProfessorRepository.update(id, { ativo: true });
    } catch (error) {
      if (error instanceof ProfessorValidationError) {
        throw error;
      }
      throw new ProfessorValidationError('Erro ao reativar professor');
    }
  }

  async findAll() {
    try {
      return await ProfessorRepository.find();
    } catch (error) {
      throw new ProfessorValidationError('Erro ao buscar professores');
    }
  }

  async findById(id: number) {
    try {
      const professor = await ProfessorRepository.findOneBy({ id });
      if (!professor) {
        throw new ProfessorValidationError('Professor não encontrado');
      }
      return professor;
    } catch (error) {
      if (error instanceof ProfessorValidationError) {
        throw error;
      }
      throw new ProfessorValidationError('Erro ao buscar professor');
    }
  }
}
