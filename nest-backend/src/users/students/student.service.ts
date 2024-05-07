import { Injectable } from '@nestjs/common';
import { StudentDTO, loginDTO } from './student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityMetadataNotFoundError, MoreThan, Repository } from 'typeorm';
import { Course } from 'src/courses/course.entity';
import { JwtService } from '@nestjs/jwt';
import { Student } from './student.entity';
import { Result } from '../../results/result.entity';
import { Posts } from '../../posts/post.entity';
import { CommentPost } from '../../comments/comment.entity';
import { randomBytes } from 'crypto';
import { MailerService } from '@nestjs-modules/mailer';
import * as bcrypt from 'bcrypt';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepo: Repository<Student>,
    @InjectRepository(Course)
    private courseRepo: Repository<Course>,
    @InjectRepository(Result)
    private resultRepo: Repository<Result>,
    @InjectRepository(Posts)
    private postRepo: Repository<Posts>,
    @InjectRepository(CommentPost)
    private comRepo: Repository<CommentPost>,
    private jwtService: JwtService,
    private readonly mailerService: MailerService
  ) {}

  async getStudentByEmail(email: string): Promise<Student> {
    return await this.studentRepo.findOneBy({ email: email });
  }

    async getAllStudents(): Promise<Student[]> {
        return await this.studentRepo.find();
    }

    async setProfilePic(id: number, pic: string): Promise<Student> {
        try {
            const student = await this.studentRepo.findOneBy({ studentId: id });

            if (!student) {
                throw new Error('Student not found');
            }

            student.profilePicture = pic;

            return await this.studentRepo.save(student);
        } catch (error) {
            throw new Error('Failed to set profile picture: ' + error.message);
        }
    }

    async forgetPass(email: string): Promise<Student>{
        const student = await this.studentRepo.findOneBy({ email: email });

        if (!student) {
            throw new Error('Student not found!');
        } else {
            const resetToken = randomBytes(32).toString('hex');

            student.resetToken = resetToken;
            await this.studentRepo.save(student);

            await this.mailerService.sendMail({
                to: email,
                subject: 'Change Password',
                text: `A token has been generated to reset your password. Copy the token and paste it the form and change your password.
                 Token: ${resetToken}
                 Link to Reset your password: http://localhost:3000/resetpassword`,
            });
        }
        return student;
    }

    async resetPass(resetToken: string, student: Student): Promise<Student> {
        const user = await this.studentRepo.findOneBy({ resetToken: resetToken });

        if (!user) {
            throw new Error('Invalid reset token!');
        } else {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(student.password, salt);

            user.password = hashedPassword;
            user.resetToken = null;
            return await this.studentRepo.save(user);
        }
    }

  getUsersByNameAndId(name: string, id: string): object {
    return {
      message: 'You id is ' + name + ' and your id is ' + id,
    };
    }
    async registerStudent(student: Student): Promise<Student> {
        return await this.studentRepo.save(student);
  }
    async getCoursesByStudent(studentId: number): Promise<Course[]> {
        const student = await this.studentRepo.findOne({
            where: { studentId },
            relations: ['courses']
        });
        if (student) {
            return student.courses;
        } else {
            return [];
        }
    }

    async createPost(sid: number, p: Posts): Promise<Posts> {
        const post = new Posts();
        post.article = p.article;
        post.file = p.file;
        post.studentId = sid;
        await this.postRepo.save(post);
        return post;
    }

    async createComment(sid: number, pid: number, com: CommentPost): Promise<CommentPost> {
        const comm = new CommentPost();
        comm.comm = com.comm;
        comm.cfile = com.cfile;
        comm.studentId = sid;
        comm.postId = pid;
        await this.comRepo.save(comm);
        return comm;
    }

    async viewAllPost(): Promise<Posts[]> {
        try {
            const posts = await this.postRepo.find();
            if (posts) {
                await this.checkCommentsForPosts(posts);
                return posts;
            } else {
                throw new Error('No posts found');
            }
        } catch (error) {
            console.error('Error fetching all posts:', error);
            throw error;
        }
    }

    async viewMyPost(studentId: number): Promise<Posts[]> {
        try {
            const posts = await this.postRepo.find({ where: { studentId } });
            if (posts) {
                await this.checkCommentsForPosts(posts);
                return posts;
            } else {
                throw new Error('No posts found for the specified student');
            }
        } catch (error) {
            console.error('Error fetching posts for student:', error);
            throw error;
        }
    }

    private async checkCommentsForPosts(posts: Posts[]): Promise<void> {
        for (const post of posts) {
            const comments = await this.comRepo.find({ where: { postId: post.postId } });
            post.comments = comments || [];
        }
    }

  async addCourse(studentId: Student, courseId: Course): Promise<Course> {
    console.log(studentId);
    console.log(courseId);

    const student = await this.studentRepo.findOneBy(studentId);
    const course = await this.courseRepo.findOneBy(courseId);

    if (!student) {
      throw new Error(`Student with ID ${studentId} not found`);
    }
    if (!course) {
      throw new Error(`Course with ID ${courseId} not found`);
    }
    try {
      student.courses.push(course);
      return this.courseRepo.save(course);
    } catch (error) {
      if (error instanceof EntityMetadataNotFoundError) {
        console.log(error);
      }
    }
  }

  async findOne(logindata: loginDTO): Promise<any> {
    return await this.studentRepo.findOneBy({ email: logindata.email });
  }

  async deleteUser(id: number): Promise<string> {
    await this.studentRepo.delete(id);
    return 'ID ' + id + ' is deleted';
  }

  async getInactiveUsers(): Promise<Student[]> {
    return this.studentRepo.find({ where: { status: 'inactive' } });
  }
}
