import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Response } from '../response/response.entity';

export enum DifficultyLevel {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}
@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  candidateId: number;

  @Column()
  skillId: number;

  @Column()
  question: string;

  @Column({ type: 'text' })
  difficulty_level: DifficultyLevel;

  @Column({ nullable: true })
  response: string;

  @Column({ type: 'integer', nullable: true })
  rating: number | null;

  @OneToMany(() => Response, (response) => response.question)
  responses: Response[];
}
