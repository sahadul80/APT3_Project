import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';
import { Course } from '../../courses/course.entity';
import { Posts } from '../../posts/post.entity';
import { CommentPost } from '../../comments/comment.entity';

export class StudentDTO { 
  @IsEmail({}, { message: 'Email must be a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
    email: string;

    @IsNotEmpty({ message: 'Password is required' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, one digit, and be at least 8 characters long',
  })
  password: string;

  @IsNotEmpty({ message: 'Name is required' })
  @Matches(/^[A-Za-z\s]+$/, { message: 'Name must contain only letters and spaces' })
  name: string;

  @IsNotEmpty({ message: 'Address is required' })
  address: string;

  status: string;

  @IsNotEmpty({ message: 'Birthdate is required' })
  age: number;

  studentId: number;

  @IsOptional()
  courses: Course[];

  @IsOptional()
  posts: Posts[];

  @IsOptional()
  comments: CommentPost[];

  profilePicture: string;

    @IsOptional()
    @IsString()
  resetToken: string;

  @IsNotEmpty({ message: 'Gender is required' })
  gender: string;

  cgpa: number;

  cgpaOBE: number;

  @IsNotEmpty({ message: 'Department is required' })
  department: string;
}

export class loginDTO {
  @IsEmail() email: string;
  @IsNotEmpty() password: string;
}
