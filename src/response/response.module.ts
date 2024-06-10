import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponseService } from './response.service';
import { ResponseController } from './response.controller';
import { Response } from './response.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Response])],
  providers: [ResponseService],
  controllers: [ResponseController],
})
export class ResponseModule {}
