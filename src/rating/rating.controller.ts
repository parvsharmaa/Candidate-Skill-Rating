import { Controller, Get, Param } from '@nestjs/common';
import { RatingService } from './rating.service';

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Get(':candidateId')
  getAggregateRatings(@Param('candidateId') candidateId: number) {
    return this.ratingService.getAggregateRatings(candidateId);
  }
}
