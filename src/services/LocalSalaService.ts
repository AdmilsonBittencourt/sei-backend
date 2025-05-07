import { LocalSalaRepository } from "../repositories/LocalSalaRepository";
import { LocalSala } from "../entities/LocalSala";

export class LocalSalaValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'LocalSalaValidationError';
  }
}

export class LocalSalaService {
  private async validateUniqueFields(data: Partial<LocalSala>, excludeId?: number) {
    if (!data.nome) return;

    const existingSala = await LocalSalaRepository.findOne({
      where: { nome: data.nome }
    });

    if (existingSala && (!excludeId || existingSala.id !== excludeId)) {
      throw new LocalSalaValidationError('O nome informado já está em uso por outra sala');
    }
  }

  async create(data: Partial<LocalSala>) {
    try {
      await this.validateUniqueFields(data);
      const sala = LocalSalaRepository.create(data);
      return await LocalSalaRepository.save(sala);
    } catch (error) {
      if (error instanceof LocalSalaValidationError) {
        throw error;
      }
      throw new LocalSalaValidationError('Erro ao criar sala');
    }
  }

  async update(id: number, data: Partial<LocalSala>) {
    try {
      await this.validateUniqueFields(data, id);
      await LocalSalaRepository.update(id, data);
      return await LocalSalaRepository.findOneBy({ id });
    } catch (error) {
      if (error instanceof LocalSalaValidationError) {
        throw error;
      }
      throw new LocalSalaValidationError('Erro ao atualizar sala');
    }
  }

  async delete(id: number) {
    return await LocalSalaRepository.update(id, { ativo: false });
  }

  async reactivate(id: number) {
    return await LocalSalaRepository.update(id, { ativo: true });
  }

  async findAll() {
    return await LocalSalaRepository.find();
  }

  async findById(id: number) {
    return await LocalSalaRepository.findOneBy({ id });
  }
}
