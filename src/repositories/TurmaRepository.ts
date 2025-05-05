import { AppDataSource } from "../data-source";
import { Turma } from "../entities/Turma";

export const TurmaRepository = AppDataSource.getRepository(Turma);
