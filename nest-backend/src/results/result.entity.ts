import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Course } from '../courses/course.entity';

@Entity('result')
export class Result {
  @PrimaryGeneratedColumn()
  rId: number;

  @Column({ default: 0.0 })
  mid: number;

  @Column({ default: 0.0 })
  final: number;

  @Column({ default: 0.0 })
  midOBE: number;

  @Column({ default: 0.0 })
  finalOBE: number;

  @OneToOne(() => Course, (course) => course.result)
  course: Course;
}
