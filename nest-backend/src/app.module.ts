import { Module } from '@nestjs/common';
import { StudentModule } from './users/students/student.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './users/students/auth/auth.module';

@Module({
  imports: [
    StudentModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'APT',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
