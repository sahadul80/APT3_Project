
import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Get,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { StudentDTO, loginDTO } from 'src/users/students/student.dto';
import * as bcrypt from 'bcrypt';
import { Student } from '../student.entity';
import express, { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { AuthGuard } from './auth.guard';

@Controller('index')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async signIn(@Body() loginData: loginDTO) {
      return await this.authService.signIn(loginData);
  }

    @Get('user')
  async getUserInfo(@Req() req: Request, @Res() res: Response) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Access Denied' });
    }
    try {
      const userInfo = await this.authService.getUserInfo(token);
      return res.status(200).json(userInfo);
    } catch (error) {
      console.error('Error getting user info: ', error);
      return res.status(401).json({ message: 'Invalid Token' });
    }
  }
}
