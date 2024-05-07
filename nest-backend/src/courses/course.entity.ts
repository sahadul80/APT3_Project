import { Student } from 'src/users/students/student.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Result } from '../results/result.entity';

@Entity('course')
export class Course {
  @PrimaryGeneratedColumn()
  courseId: number;

  @Column({ type: 'varchar', length: 100 })
  courseName: string;

  @Column({ type: 'varchar', length: 2 })
  section: string;

  @Column({ default: null })
  studentId: number;

  @ManyToMany(() => Student, (student) => student.courses)
  @JoinTable()
  students: Student[];

  @OneToOne(() => Result, (result) => result.course)
  @JoinColumn()
  result: Result;
}
