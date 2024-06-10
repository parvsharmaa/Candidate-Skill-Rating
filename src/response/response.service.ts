import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Response } from './response.entity';

@Injectable()
export class ResponseService {
  constructor(
    @InjectRepository(Response)
    private responsesRepository: Repository<Response>
  ) {}

  async createResponse(
    questionId: number,
    candidateId: number,
    response: string
  ): Promise<Response> {
    const newResponse = this.responsesRepository.create({
      question: { id: questionId },
      candidate: { id: candidateId },
      response: response,
    });
    return this.responsesRepository.save(newResponse);
  }

  async rateResponse(id: number, rating: number): Promise<Response> {
    try {
      const responseToUpdate = await this.responsesRepository.findOne({
        where: { id },
      });
      if (!responseToUpdate) {
        throw new Error(`Response with id ${id} not found.`);
      }
      responseToUpdate.rating = rating;
      return this.responsesRepository.save(responseToUpdate);
    } catch (error) {
      throw new Error(`Failed to rate response: ${error.message}`);
    }
  }

  async findAll(): Promise<Response[]> {
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
