import { AppDataSource } from "../data-source";
import { Professor } from "../entities/Professor";

export const ProfessorRepository = AppDataSource.getRepository(Professor);
