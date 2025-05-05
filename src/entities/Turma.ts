import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { LocalSala } from "./LocalSala";
import { Professor } from "./Professor";
import { Disciplina } from "./Disciplina";

@Entity()
export class Turma {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 200, unique: true })
  codigo!: string;

  @Column({ length: 200 })
  semestre!: string;

  @Column({ length: 200 })
  horario!: string;

  @Column({ default: true })
  ativo!: boolean;

  @ManyToOne(() => LocalSala, sala => sala.turmas)
  @JoinColumn({name: "id_sala"})
  sala!: LocalSala;

  @ManyToOne(() => Professor, professor => professor.turmas)
  @JoinColumn({name: "id_professor"})
  professor!: Professor;

  @ManyToOne(() => Disciplina, disciplina => disciplina.turmas)
  @JoinColumn({name: "id_disciplina"})
  disciplina!: Disciplina;
}
