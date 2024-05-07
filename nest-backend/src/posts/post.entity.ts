import { Student } from 'src/users/students/student.entity';
import {
    Column,
    Entity,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { CommentPost } from '../comments/comment.entity';

@Entity('post')
export class Posts {
    @PrimaryGeneratedColumn()
    postId: number;

    @Column({ type: 'varchar' })
    article: string;

    @Column({ default: null })
    file: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) // Add this line for the date property
    date: Date; // Define the createdAt property of type Date

    @Column({ default: null })
    studentId: number;

    @ManyToOne(() => Student, (student) => student.posts)
    student: Student;

    @OneToMany(() => CommentPost, (comment) => comment.post, { cascade: true })
    comments: CommentPost[];
}