import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Turma } from "./Turma";

@Entity()
export class Professor {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 200 })
  nome!: string;

  @Column({ length: 200 })
  email!: string;

  @Column({ length: 200 })
  telefone!: string;

  @Column({ length: 200 })
  CPF!: string;

  @Column({ length: 200 })
  departamento!: string;

  @Column({ default: true })
  ativo!: boolean;

  @OneToMany(() => Turma, turma => turma.professor)
  turmas!: Turma[];
}
