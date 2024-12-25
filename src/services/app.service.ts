import { Injectable } from '@nestjs/common';
import { TaskRepository } from '../modules/repository/services/task.repository';

@Injectable()
export class AppService {
  constructor(private readonly taskRepository: TaskRepository) {
  }

  public async getAll() {
    return await this.taskRepository.find();
  }

  public async getById(id: number) {
    return await this.taskRepository.findOneBy({ id });
  }

  public async doneTask(id: number) {
    const task = await this.getById(id);
    if (!task) return null;

    task.isCompleted = !task.isCompleted;
    await this.taskRepository.save(task);
    return await this.getAll();
  }

  public async createTask(title: string) {
    const task = await this.taskRepository.create({ title });
    if (!task) return null;

    await this.taskRepository.save(task);
    return await this.getAll();
  }

  public async editTask(id: number, title: string) {
    const task = await this.getById(id);
    if (!task) return null;

    task.title = title;
    await this.taskRepository.save(task);
    return await this.getAll();
  }

  public async deleteTAsk(id: number) {
    const task = await this.getById(id);
    if (!task) return null;

    await this.taskRepository.delete({ id });
    return await this.getAll();
  }
}