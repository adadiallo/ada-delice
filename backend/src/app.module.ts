import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { MenuEmployerModule } from './menu-employer/menu-employer.module';
import { MenuEmployer } from './menu-employer/entities/menu-employer.entity';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { PanierModule } from './panier/panier.module';
import { PanierItem } from './panier/entities/panier-item.entity';
import { CommandeModule } from './commande/commande.module';
import { Commande } from './commande/entites/commande.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CommandeItem } from './commande/entites/commande-item.entity';

@Module({
  imports: [
    // 🔧 Chargement des variables .env
    ConfigModule.forRoot({
      isGlobal: true, // 👈 rend disponible dans toute l'application
    }),

    // ⚙️ Connexion à la base PostgreSQL
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
      type: 'postgres',
      host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
      entities: [User,MenuEmployer,PanierItem,Commande,CommandeItem],
      synchronize: true, 
      
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    MenuEmployerModule,
    PanierModule,
    CommandeModule,
  ],
  providers: [CloudinaryService],
})
export class AppModule {}
