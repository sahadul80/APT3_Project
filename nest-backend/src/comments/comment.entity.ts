import {
    Column,
    Entity,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Posts } from '../posts/post.entity';
import { Student } from '../users/students/student.entity';

@Entity('Comment')
export class CommentPost {
    @PrimaryGeneratedColumn()
    commentId: number;

    @Column({ type: 'varchar' })
    comm: string;

    @Column({ default: null })
    cfile: string;

    @Column({ default: null })
    postId: number;

    @Column({ default: null })
    studentId: number;

    @ManyToOne(() => Posts, (post) => post.comments)
    post: Posts;

    @ManyToOne(() => Student, (student) => student.comments)
    student: Student;
}