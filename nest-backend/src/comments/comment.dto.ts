import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Student } from "../users/students/student.entity";
import { Posts } from "../posts/post.entity";

export class CommentDTO {
    commentId: number;
    @IsString()
    @IsNotEmpty()
    comm: string;
    @IsOptional()
    cfile: string;
    studentId: number;
    postId: number;
    @IsOptional()
    student: Student;
    @IsOptional()
    post: Posts;
}