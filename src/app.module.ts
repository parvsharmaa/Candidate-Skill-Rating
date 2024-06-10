import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { QuestionModule } from './question/question.module';
import { ResponseModule } from './response/response.module';
import { AuthModule } from './auth/auth.module';
import { RatingModule } from './rating/rating.module';
import { User } from './user/user.entity';
import { Question } from './question/question.entity';
import { Response } from './response/response.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'data/database.sqlite',
      entities: [User, Question, Response],
      synchronize: true,
    }),
    UserModule,
    QuestionModule,
    ResponseModule,
    AuthModule,
    RatingModule,
  ],
})
export class AppModule {}
