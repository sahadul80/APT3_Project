import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Student } from "../users/students/student.entity";
import { CommentPost } from "../comments/comment.entity";

export class PostDTO {
    postId: number;
    @IsString()
    @IsNotEmpty()
    article: string;
    @IsOptional()
    file: string;
    studentId: number;
    @IsOptional()
    student: Student;
    @IsOptional()
    comments: CommentPost[];
    @IsDate()
    @IsOptional()
    date: Date;
}