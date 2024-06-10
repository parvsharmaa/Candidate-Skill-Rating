import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User, UserRole } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(
    @Body() body: { name: string; role: UserRole; password: string },
  ): Promise<User> {
    return this.userService.createUser(body.name, body.role, body.password);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<User | null> {
    return this.userService.findOne(id);
  }

  @Put(':id')
  updateUser(
    @Param('id') id: number,
    @Body() body: { name: string; role: UserRole },
  ): Promise<User> {
    return this.userService.updateUser(id, body.name, body.role);
  }

  @Delete(':id')
  removeUser(@Param('id') id: number): Promise<void> {
    return this.userService.removeUser(id);
  }
}
