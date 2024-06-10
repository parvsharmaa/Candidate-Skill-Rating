import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Response } from './response.entity';

@Injectable()
export class ResponseService {
  constructor(
    @InjectRepository(Response)
    private responsesRepository: Repository<Response>,
  ) {}

  createResponse(
    questionId: number,
    candidateId: number,
    response: string,
  ): Promise<Response> {
    const newResponse = this.responsesRepository.create({
      question: { id: questionId },
      candidate: { id: candidateId },
      response,
    });
    return this.responsesRepository.save(newResponse);
  }

  rateResponse(id: number, rating: number): Promise<Response> {
    return this.responsesRepository.save({ id, rating });
  }

  findAll(): Promise<Response[]> {
    return this.responsesRepository.find({
      relations: ['question', 'candidate'],
    });
  }

  async findOne(id: number): Promise<Response | null> {
    return await this.responsesRepository.findOne({
      where: { id },
      relations: ['question', 'candidate'],
    });
  }

  async removeResponse(id: number): Promise<void> {
    await this.responsesRepository.delete(id);
  }
}
