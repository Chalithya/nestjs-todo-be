import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  async getAllTasks(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Post()
  async createTask(@Body() task: CreateTaskDto): Promise<Task> {
    return this.taskService.create(task);
  }

  @Get(':id')
  async getTasks(@Param('id') id: string): Promise<Task> {
    return this.taskService.findById(id);
  }

  @Put(':id')
  async updateTask(
    @Param('id') id: string,
    @Body() task: UpdateTaskDto,
  ): Promise<Task> {
    return this.taskService.updateById(id, task);
  }

  @Delete(':id')
  async deleteTasks(@Param('id') id: string): Promise<Task> {
    return this.taskService.deleteById(id);
  }
}
