import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './schemas/task.schema';
import mongoose from 'mongoose';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  constructor(
    @InjectModel(Task.name)
    private TaskModel: mongoose.Model<Task>,
  ) {}

  async findAll(): Promise<Task[]> {
    const tasks = await this.TaskModel.find();
    this.logger.log('Find all tasks successfull');
    return tasks;
  }

  async create(task: Task): Promise<Task> {
    const createdTask = await this.TaskModel.create(task);
    if (!createdTask) throw new NotFoundException('Create task failed');

    this.logger.log('Create task successfull');
    return createdTask;
  }

  async findById(id: string): Promise<Task> {
    const task = await this.TaskModel.findById(id);
    if (!task) throw new NotFoundException(`Task ${id} not found`);

    this.logger.log('Find task by id successfull');
    return task;
  }

  async updateById(id: string, task: Task): Promise<Task> {
    const updatedTask = await this.TaskModel.findByIdAndUpdate(id, task, {
      new: true,
      runValidators: true,
    });
    if (!updatedTask) throw new NotFoundException(`Task ${id} not found`);

    this.logger.log('Update task successfull');
    return updatedTask;
  }

  async deleteById(id: string): Promise<Task> {
    const task = await this.TaskModel.findByIdAndDelete(id);
    if (!task) throw new NotFoundException(`Task ${id} not found`);

    this.logger.log('Delete task successfull');
    return task;
  }
}
