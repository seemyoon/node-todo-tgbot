import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Task' })
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'boolean', default: false })
  isCompleted: boolean;
}