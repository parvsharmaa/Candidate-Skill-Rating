import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  createUser(name: string, role: UserRole, password: string): Promise<User> {
    const user = this.usersRepository.create({ name, role, password });
    return this.usersRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User | null> {
    return await this.usersRepository.findOneBy({ id });
  }

  async findOneByName(name: string): Promise<User | null> {
    return await this.usersRepository.findOne({ where: { name } });
  }

  updateUser(id: number, name: string, role: UserRole): Promise<User> {
    return this.usersRepository.save({ id, name, role });
  }

  async removeUser(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
