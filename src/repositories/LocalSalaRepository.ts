import { AppDataSource } from "../data-source";
import { LocalSala } from "../entities/LocalSala";

export const LocalSalaRepository = AppDataSource.getRepository(LocalSala);
