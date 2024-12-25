import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { TaskEntity } from '../../../database/entities/task.entity';

@Injectable()
export class TaskRepository extends Repository<TaskEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(TaskEntity, dataSource.manager);
  }
}