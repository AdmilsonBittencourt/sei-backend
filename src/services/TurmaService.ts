import { TurmaRepository } from "../repositories/TurmaRepository";
import {DisciplinaRepository} from "../repositories/DisciplinaRepository"
import { TurmaDTO } from "../DTO/TurmaDTO";
import { ProfessorRepository } from "../repositories/ProfessorRepository";
import { LocalSalaRepository } from "../repositories/LocalSalaRepository";

export class TurmaService {

  async create(data: Partial<TurmaDTO>) {
    const [disciplina, professor, localsala] = await Promise.all([
      DisciplinaRepository.findOne({where: {id: data.id_disciplina}}),
      ProfessorRepository.findOne({where: {id: data.id_professor}}),
      LocalSalaRepository.findOne({where: {id: data.id_sala}}),
    ])
    if(!disciplina) throw new Error('Disciplina not found');
    if(!professor) throw new Error('Professor not found');
    if(!localsala) throw new Error('LocalSala not found');

    const turma = TurmaRepository.create({
      ...data, 
      disciplina: disciplina,
      professor: professor,
      sala: localsala,
    });
    return await TurmaRepository.save(turma);
  }

  async update(id: number, data: Partial<TurmaDTO>) {
    const turma = await TurmaRepository.findOne({where: {id}});
    if(!turma) throw new Error('turma not fund');

    const [disciplina, professor, localsala] = await Promise.all([
      DisciplinaRepository.findOne({where: {id: data.id_disciplina}}),
      ProfessorRepository.findOne({where: {id: data.id_professor}}),
      LocalSalaRepository.findOne({where: {id: data.id_sala}}),
    ]);
    
    if(turma.codigo != data.codigo){
      const codigoExist = await TurmaRepository.findOneBy({
        codigo: data.codigo
      })

      if(codigoExist) throw new Error('Esse código já existe');
      turma.codigo = data.codigo!;
    }

    turma.horario = data.horario!;
    turma.semestre = data.semestre!; // deixar ele obrigatorio no front
    if(!disciplina) throw new Error('Disciplina not fund');
    turma.disciplina = disciplina;
    if(!professor) throw new Error('Professor not fund');
    turma.professor = professor;
    if(!localsala) throw new Error('LocalSala not fund');
    turma.sala = localsala;

    await TurmaRepository.update(id, turma);
    return await TurmaRepository.findOne({
      where: { id },
      relations: ["professor", "disciplina", "sala"]
    });
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
