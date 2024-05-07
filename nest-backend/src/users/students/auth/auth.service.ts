import { Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { StudentService } from '../student.service';
import { StudentDTO, loginDTO } from 'src/users/students/student.dto';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { Student } from '../student.entity';

@Injectable()
export class AuthService {
  constructor(
    private studentService: StudentService,
    private jwtService: JwtService,
  ) {}
  async signIn(loginData: loginDTO): Promise<{ access_token: string }> {
    const user = await this.studentService.findOne(loginData);
    if (!user) {
      throw new UnauthorizedException();
    }
    const isMatch = await bcrypt.compare(loginData.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = loginData;
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async verifyToken(req: Request, res: Response): Promise<void> {
    const token = req.headers.authorization?.split(' ')[1];
    const SECRET_KEY = process.env.JWT_SECRET_KEY || 'default_secret_key';
    if (!token) {
      res.status(401).json({ message: 'Access Denied' });
    }
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      req.body.user = decoded;
      console.log(req.body.user);
    } catch (error) {
      console.error('Error Verifying Token: ', error);
      res.status(401).json({ message: 'Invalid Token' });
    }
  }
  async getUserInfo(token: string): Promise<any> {
    try {
      const decoded = this.jwtService.decode(token);
      return decoded;
    } catch (error) {
      console.error('Error decoding token: ', error);
      throw new Error('Error decoding token');
    }
  }
}
