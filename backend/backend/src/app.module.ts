import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { MenuEmployerModule } from './menu-employer/menu-employer.module';
import { MenuEmployer } from './menu-employer/entities/menu-employer.entity';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { PanierModule } from './panier/panier.module';
import { Panier } from './panier/entities/panier.entity';
import { PanierItem } from './panier/entities/panier-item.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', 
      port: 5432,
      username: 'postgres',
      password: 'adminPassword',
      database: 'restaurant',
      entities: [User,MenuEmployer,Panier,PanierItem],
      synchronize: true, 
    }),
    AuthModule,
    UserModule,
    MenuEmployerModule,
    PanierModule,
  ],
  providers: [CloudinaryService],
})
export class AppModule {}
