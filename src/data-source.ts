// src/data-source.ts
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Disciplina } from "./entities/Disciplina";
import { LocalSala } from "./entities/LocalSala";
import { Professor } from "./entities/Professor";
import { Turma } from "./entities/Turma";


export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "meu_usuario", 
  password: "minha_senha",
  database: "meu_banco",
  synchronize: true, // cuidado em produção!
  logging: true,
  entities: [Disciplina, LocalSala, Professor, Turma],
  migrations: [],
  subscribers: [],
});
