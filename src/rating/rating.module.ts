import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import { Question } from '../question/question.entity';
import { QuestionModule } from '../question/question.module';

@Module({
  imports: [TypeOrmModule.forFeature([Question]), QuestionModule],
  providers: [RatingService],
  controllers: [RatingController],
})
export class RatingModule {}
