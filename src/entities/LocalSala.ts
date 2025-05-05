import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Turma } from "./Turma";

@Entity()
export class LocalSala {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 200 })
  nome!: string;

  @Column({ length: 200 })
  tipo!: string;

  @Column("int")
  capacidade!: number;

  @Column({ default: true })
  ativo!: boolean;

  @OneToMany(() => Turma, turma => turma.sala)
  turmas!: Turma[];
}
