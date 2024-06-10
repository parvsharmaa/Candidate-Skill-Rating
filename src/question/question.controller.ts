import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { Question, DifficultyLevel } from './question.entity';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  createQuestion(
    @Body()
    body: {
      skillId: number;
      difficulty_level: DifficultyLevel;
      question: string;
    },
  ): Promise<Question> {
    return this.questionService.createQuestion(
      body.skillId,
      body.question,
      body.difficulty_level,
    );
  }

  @Get()
  findAll(): Promise<Question[]> {
    return this.questionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Question | null> {
    return this.questionService.findOne(id);
  }

  @Put(':id')
  updateQuestion(
    @Param('id') id: number,
    @Body()
    body: {
      skillId: number;
      difficulty_level: DifficultyLevel;
      question: string;
    },
  ): Promise<Question> {
    return this.questionService.updateQuestion(
      id,
      body.skillId,
      body.question,
      body.difficulty_level,
    );
  }

  @Delete(':id')
  removeQuestion(@Param('id') id: number): Promise<void> {
    return this.questionService.removeQuestion(id);
  }
}
