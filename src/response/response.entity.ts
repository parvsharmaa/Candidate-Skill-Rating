import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Question } from '../question/question.entity';
import { User } from '../user/user.entity';

@Entity()
export class Response {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Question, (question) => question.id)
  question: Question;

  @ManyToOne(() => User, (user) => user.id)
  candidate: User;

  @Column()
  response: string;

  @Column({ nullable: true })
  rating: number;
}
