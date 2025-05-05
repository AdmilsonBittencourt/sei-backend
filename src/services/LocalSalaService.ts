import { LocalSalaRepository } from "../repositories/LocalSalaRepository";
import { LocalSala } from "../entities/LocalSala";

export class LocalSalaService {
  async create(data: Partial<LocalSala>) {
    const sala = LocalSalaRepository.create(data);
    return await LocalSalaRepository.save(sala);
  }

  async update(id: number, data: Partial<LocalSala>) {
    await LocalSalaRepository.update(id, data);
    return await LocalSalaRepository.findOneBy({ id });
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
