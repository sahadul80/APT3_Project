import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Res,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  HttpCode,
  HttpStatus,
  Put,
  Delete,
  Patch,
  ParseIntPipe,
  BadRequestException,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentDTO, loginDTO } from './student.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import { Course } from 'src/courses/course.entity';
import { Student } from './student.entity';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import * as bcrypt from 'bcrypt';
import { PostDTO } from '../../posts/post.dto';
import { CommentDTO } from '../../comments/comment.dto';
import { Posts } from '../../posts/post.entity';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get('user')
  getUsersByNameAndId(
    @Query('name') name: string,
    @Query('id') id: string,
  ): object {
    return this.studentService.getUsersByNameAndId(name, id);
  }

    @Get('users')
    async getAllUsers(): Promise<Student[]> {
        return await this.studentService.getAllStudents();
    }

    @Get('posts')
    async viewAllPost(): Promise<Posts[]> {
        return await this.studentService.viewAllPost();
    }

  @Post('register')
  @UsePipes(new ValidationPipe())
  async registerStudent(@Body() studentDto: StudentDTO): Promise<StudentDTO> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(studentDto.password, salt);

    const student: Student = {
      ...studentDto,
      password: hashedPassword,
    };
    return this.studentService.registerStudent(student);
  }

    @UseGuards(AuthGuard)
    @Get('user/:email')
    async getUserByEmail(@Param('email') email: string): Promise<Student> {
        return await this.studentService.getStudentByEmail(email);
    }

    @UseGuards(AuthGuard)
    @Post('post/:id')
    async createPost(@Param('id', ParseIntPipe) id: number, @Body() post: PostDTO): Promise<PostDTO> {
        return await this.studentService.createPost(id, post);
    }

    @UseGuards(AuthGuard)
    @Post('post/:sid/:pid')
    async createComment(@Param('sid', ParseIntPipe) sid: number, @Param('pid', ParseIntPipe) pid: number, @Body() comm: CommentDTO): Promise<CommentDTO> {
        return await this.studentService.createComment(sid, pid, comm);
    }

    @UseGuards(AuthGuard)
    @Post('profile-picture/:id')
    @UseInterceptors(FileInterceptor('profilePicture', {
        fileFilter: (req, file, cb) => {
            if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg|JPG)$/)) {
                cb(null, true);
            } else {
                cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
            }
        },
        limits: { fileSize: 10000000 },
        storage: diskStorage({
            destination: './uploads',
            filename: function (req, file, cb) {
                cb(null, Date.now() + file.originalname)
            },
        })
    }))
    async uploadFile(@UploadedFile() file: Express.Multer.File, @Param('id', ParseIntPipe) id: number) {
        try {
            if (!file) {
                throw new BadRequestException('No file uploaded.');
            }

            const profile = await this.studentService.setProfilePic(id, file.filename);
            return profile;
        } catch (error) {
            throw new BadRequestException('Failed to upload profile picture: ' + error.message);
        }
    }

    @Get('forgetpass/:email')
    async forgetPass(@Param('email') email: string): Promise<Student> {
        return await this.studentService.forgetPass(email);
    }

    @Post('resetpass/:token')
    @UsePipes(new ValidationPipe())
    async resetPass(@Param('token') token:string, @Body() student: Student): Promise<Student> {
        return await this.studentService.resetPass(token,student);
    }

  @Get('getimage/:name')
  getImages(@Param('name') name: string, @Res() res) {
    res.sendFile(name, { root: './uploads' });
  }
  @Post('addcourse/:id')
  async addCourse(
    @Param('id') studentId: Student,
    @Body() courseId: Course,
  ): Promise<Course> {
    return this.studentService.addCourse(studentId, courseId);
  }
    @Get('courses/:id')
    getAllCourses(@Param('id') id: number): Promise<Course[]> {
      return this.studentService.getCoursesByStudent(id);
  }

  @Get('inactive')
  async getInactiveUsers(): Promise<Student[]> {
    return this.studentService.getInactiveUsers();
  }

  @Delete(':id')
  async deleteUser(@Param('id') userId: number): Promise<string> {
    return this.studentService.deleteUser(userId);
  }
}
