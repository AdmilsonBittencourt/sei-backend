// src/index.ts
import express from "express";
import { AppDataSource } from "./data-source";
import professorRoutes from "./routes/professor.routes";
import disciplinaRoutes from "./routes/disciplina.routes";
import localSalaRoutes from "./routes/localsala.routes";
import turmaRoutes from "./routes/turma.routes";
import cors from 'cors';

AppDataSource.initialize().then(() => {
  const app = express();
  app.use(cors()); 
  app.use(express.json());
  app.use("/professores", professorRoutes);
  app.use("/disciplinas", disciplinaRoutes);
  app.use("/salas", localSalaRoutes);
  app.use("/turmas", turmaRoutes);

  app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
}).catch((error) => console.log(error));
