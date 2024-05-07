import { Course } from 'src/courses/course.entity';
import { Column, Entity, JoinColumn, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Posts } from '../../posts/post.entity';
import { CommentPost } from '../../comments/comment.entity';

@Entity('student')
export class Student {
  @PrimaryGeneratedColumn()
  studentId: number;
  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;
  @Column({ type: 'varchar' })
  password: string;
  @Column({ type: 'varchar', length: 150 })
  name: string;
  @Column({default: null })
  age: number;
  @Column({ type: 'varchar', default: null })
  address: string;
  @Column({ type: 'varchar', default: null })
  gender: string;
  @Column({ type: 'varchar', default: null })
  department: string;
  @Column({ default: null })
  resetToken: string;
  @Column({ default: null })
  profilePicture: string;
  @Column({ default: 0.0 })
  cgpa: number;
  @Column({ default: 0.0 })
  cgpaOBE: number;
  @Column({ default: 'active' })
  status: string;

  @ManyToMany(() => Course, (course) => course.students, { cascade: true })
  courses: Course[];

  @OneToMany(() => Posts, (post) => post.student, { cascade: true })
  posts: Posts[];

  @OneToMany(() => CommentPost, (comment) => comment.student, { cascade: true })
  comments: CommentPost[];
}
