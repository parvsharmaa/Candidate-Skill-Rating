import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum DifficultyLevel {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
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
}
