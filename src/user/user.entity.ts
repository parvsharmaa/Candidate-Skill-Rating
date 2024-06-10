import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
