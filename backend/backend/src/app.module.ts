import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { MenuEmployerModule } from './menu-employer/menu-employer.module';
import { MenuEmployer } from './menu-employer/entities/menu-employer.entity';
import { CloudinaryService } from './cloudinary/cloudinary.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', 
      port: 5432,
      username: 'postgres',
      password: 'adminPassword',
      database: 'restaurant',
      entities: [User,MenuEmployer],
      synchronize: true, 
    }),
    AuthModule,
    UserModule,
    MenuEmployerModule,
  ],
  providers: [CloudinaryService],
})
export class AppModule {}
