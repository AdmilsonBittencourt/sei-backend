import { AppDataSource } from "../data-source";
import { Disciplina } from "../entities/Disciplina";

export const DisciplinaRepository = AppDataSource.getRepository(Disciplina);
