import { Global, Module } from '@nestjs/common';
import { TaskRepository } from './services/task.repository';

@Global()
@Module({
  providers: [TaskRepository],
  exports: [TaskRepository],
})
export class RepositoryModule {}