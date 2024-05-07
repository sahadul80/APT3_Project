import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { Course } from 'src/courses/course.entity';
import { JwtModule } from '@nestjs/jwt/dist/jwt.module';
import { AuthService } from './auth/auth.service';
import { Result } from '../../results/result.entity';
import { Posts } from '../../posts/post.entity';
import { CommentPost } from '../../comments/comment.entity';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
    imports: [
    TypeOrmModule.forFeature([Student, Course, Result, Posts, CommentPost]),
    JwtModule.register({
      global: true,
      secret: '3NP_Backend_Admin',
      signOptions: { expiresIn: '30m' },
    }),
    MailerModule.forRoot({
        transport: {
            host: 'smtp.gmail.com',
            port: 465,
            ignoreTLS: true,
            source: true,
            auth: {
                user: 'educationassistant566@gmail.com',
                pass: 'npbh qbks glbj opwo'
            }
        }
    })
  ],
  controllers: [StudentController],
  providers: [StudentService, AuthService],
  exports: [StudentService],
})
export class StudentModule {}
