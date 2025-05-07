import { TurmaRepository } from "../repositories/TurmaRepository";
import { DisciplinaRepository } from "../repositories/DisciplinaRepository";
import { TurmaDTO } from "../DTO/TurmaDTO";
import { ProfessorRepository } from "../repositories/ProfessorRepository";
import { LocalSalaRepository } from "../repositories/LocalSalaRepository";
import { Turma } from "../entities/Turma"; // Supondo que você tenha uma entidade Turma

// Defina a classe de erro de validação para Turma
export class TurmaValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TurmaValidationError';
  }
}

export class TurmaService {

  private async validateUniqueFields(data: Partial<TurmaDTO>, excludeId?: number) {
    if (data.codigo) {
      const existingTurma = await TurmaRepository.findOne({
        where: { codigo: data.codigo }
      });

      if (existingTurma && (!excludeId || existingTurma.id !== excludeId)) {
        throw new TurmaValidationError('O código informado já está em uso por outra turma.');
      }
    }
  }

  async create(data: Partial<TurmaDTO>) {
    try {
      await this.validateUniqueFields(data);

      const [disciplina, professor, localsala] = await Promise.all([
        DisciplinaRepository.findOne({ where: { id: data.id_disciplina } }),
        ProfessorRepository.findOne({ where: { id: data.id_professor } }),
        LocalSalaRepository.findOne({ where: { id: data.id_sala } }),
      ]);

      if (!disciplina) throw new TurmaValidationError('Disciplina não encontrada.');
      if (!professor) throw new TurmaValidationError('Professor não encontrado.');
      if (!localsala) throw new TurmaValidationError('Local/Sala não encontrado(a).');

      // Assegurar que o código seja passado, se fornecido em data
      const turmaDataToCreate: Partial<Turma> = {
        ...data,
        disciplina: disciplina,
        professor: professor,
        sala: localsala,
      };
      if (data.codigo) {
        turmaDataToCreate.codigo = data.codigo;
      }


      const turma = TurmaRepository.create(turmaDataToCreate as Turma); // Cast para Turma se necessário
      return await TurmaRepository.save(turma);
    } catch (error) {
      if (error instanceof TurmaValidationError) {
        throw error;
      }
      // Log genérico ou re-throw de erro mais específico se necessário
      console.error("Erro ao criar turma:", error);
      throw new TurmaValidationError('Erro ao criar turma. Verifique os dados e tente novamente.');
    }
  }

  async update(id: number, data: Partial<TurmaDTO>) {
    try {
      const turma = await TurmaRepository.findOne({ where: { id } });
      if (!turma) throw new TurmaValidationError('Turma não encontrada.');

      // Validar código apenas se ele for fornecido e diferente do atual, ou se for uma nova turma
      if (data.codigo && data.codigo !== turma.codigo) {
        await this.validateUniqueFields({ codigo: data.codigo }, id);
      }

      const [disciplina, professor, localsala] = await Promise.all([
        data.id_disciplina ? DisciplinaRepository.findOne({ where: { id: data.id_disciplina } }) : Promise.resolve(turma.disciplina),
        data.id_professor ? ProfessorRepository.findOne({ where: { id: data.id_professor } }) : Promise.resolve(turma.professor),
        data.id_sala ? LocalSalaRepository.findOne({ where: { id: data.id_sala } }) : Promise.resolve(turma.sala),
      ]);

      if (data.id_disciplina && !disciplina) throw new TurmaValidationError('Disciplina não encontrada.');
      if (data.id_professor && !professor) throw new TurmaValidationError('Professor não encontrado.');
      if (data.id_sala && !localsala) throw new TurmaValidationError('Local/Sala não encontrado(a).');
      
      // Atualiza os campos da turma
      if (data.codigo) turma.codigo = data.codigo;
      if (data.horario) turma.horario = data.horario;
      if (data.semestre) turma.semestre = data.semestre; // deixar ele obrigatorio no front
      if (disciplina) turma.disciplina = disciplina;
      if (professor) turma.professor = professor;
      if (localsala) turma.sala = localsala;
      if (typeof data.ativo === 'boolean') turma.ativo = data.ativo;


      // O método update do repositório pode não retornar a entidade atualizada com relações.
      // Por isso, salvamos a entidade modificada ou buscamos novamente.
      // Usar save é mais direto se 'turma' é a entidade completa e rastreada.
      await TurmaRepository.save(turma); 
      
      return await TurmaRepository.findOne({
        where: { id },
        relations: ["professor", "disciplina", "sala"]
      });
    } catch (error) {
      if (error instanceof TurmaValidationError) {
        throw error;
      }
      console.error("Erro ao atualizar turma:", error);
      throw new TurmaValidationError('Erro ao atualizar turma. Verifique os dados e tente novamente.');
    }
  }

  async delete(id: number) {
    return await TurmaRepository.update(id, { ativo: false });
  }

  async reactivate(id: number) {
    return await TurmaRepository.update(id, { ativo: true });
  }

  async findAll() {
    return await TurmaRepository.find({
      relations: ["professor", "disciplina", "sala"]
    });
  }

  async findById(id: number) {
    return await TurmaRepository.findOne({
      where: { id },
      relations: ["professor", "disciplina", "sala"]
    });
  }
}
