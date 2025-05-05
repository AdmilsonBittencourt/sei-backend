import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Turma } from "./Turma";

@Entity()
export class Disciplina {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 200 })
  nome!: string;

  @Column({ length: 200 })
  codigo!: string;

  @Column("int")
  carga_horaria!: number;

  @Column({ default: true })
  ativo!: boolean;

  @OneToMany(() => Turma, turma => turma.disciplina)
  turmas!: Turma[];
}
