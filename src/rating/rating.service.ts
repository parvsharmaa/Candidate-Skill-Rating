import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from '../question/question.entity';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(Question)
    private questionsRepository: Repository<Question>,
  ) {}

  async getAggregateRatings(
    candidateId: number,
  ): Promise<{ skillId: number; rating: number }[]> {
    const questions = await this.questionsRepository.find({
      where: { candidateId },
    });

    const skillRatings: {
      [skillId: number]: { total: number; count: number };
    } = {};

    questions.forEach((question) => {
      const { skillId, difficulty_level, rating } = question;

      if (rating !== null) {
        if (!skillRatings[skillId]) {
          skillRatings[skillId] = { total: 0, count: 0 };
        }

        const weight = this.getDifficultyWeight(difficulty_level);

        skillRatings[skillId].total += rating * weight;
        skillRatings[skillId].count += weight;
      }
    });

    return Object.keys(skillRatings).map((skillId) => ({
      skillId: Number(skillId),
      rating: skillRatings[+skillId].total / skillRatings[+skillId].count,
    }));
  }

  private getDifficultyWeight(difficulty_level: string): number {
    switch (difficulty_level) {
      case 'easy':
        return 1;
      case 'medium':
        return 2;
      case 'hard':
        return 3;
      default:
        return 1;
    }
  }
}
