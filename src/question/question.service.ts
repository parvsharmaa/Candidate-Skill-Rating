import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question, DifficultyLevel } from './question.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionsRepository: Repository<Question>,
  ) {}

  async createQuestion(
    skillId: number,
    question: string,
    difficulty_level: DifficultyLevel,
  ): Promise<Question> {
    const newQuestion = this.questionsRepository.create({
      skillId,
      question,
      difficulty_level,
    });

    return this.questionsRepository.save(newQuestion);
  }

  findAll(): Promise<Question[]> {
    return this.questionsRepository.find();
  }

  async findOne(id: number): Promise<Question> {
    const question = await this.questionsRepository.findOneBy({ id });
    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }
    return question;
  }

  async updateQuestion(
    id: number,
    skillId: number,
    question: string,
    difficulty_level: DifficultyLevel,
  ): Promise<Question> {
    await this.questionsRepository.update(id, {
      skillId,
      question,
      difficulty_level,
    });
    return this.findOne(id);
  }

  async removeQuestion(id: number): Promise<void> {
    const result = await this.questionsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }
  }
}
