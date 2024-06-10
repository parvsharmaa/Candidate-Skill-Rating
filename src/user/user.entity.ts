import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Response } from '../response/response.entity';

export enum UserRole {
  CANDIDATE = 'candidate',
  REVIEWER = 'reviewer',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text' })
  role: UserRole;

  @Column()
  password: string;

  @OneToMany(() => Response, (response) => response.candidate)
  responses: Response[];
}
