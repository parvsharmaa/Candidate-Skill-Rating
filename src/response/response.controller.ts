import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ResponseService } from './response.service';
import { Response } from './response.entity';

@Controller('response')
export class ResponseController {
  constructor(private readonly responseService: ResponseService) {}

  @Post()
  async createResponse(
    @Body()
    body: {
      questionId: number;
      candidateId: number;
      response: string;
    }
  ): Promise<Response> {
    return this.responseService.createResponse(
      body.questionId,
      body.candidateId,
      body.response
    );
  }

  @Put(':id/rate')
  async rateResponse(
    @Param('id') id: number,
    @Body() body: { rating: number }
  ): Promise<Response> {
    return this.responseService.rateResponse(id, body.rating);
  }

  @Get()
  async findAll(): Promise<Response[]> {
    return this.responseService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Response | null> {
    return this.responseService.findOne(id);
  }

  @Delete(':id')
  async removeResponse(@Param('id') id: number): Promise<void> {
    return this.responseService.removeResponse(id);
  }
}
