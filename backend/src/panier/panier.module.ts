import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PanierService } from './panier.service';
import { PanierController } from './panier.controller';
import { Panier } from './entities/panier.entity';
import { PanierItem } from './entities/panier-item.entity';
import { MenuEmployer } from 'src/menu-employer/entities/menu-employer.entity';
import { User } from 'src/user/entities/user.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Panier, PanierItem, MenuEmployer, User]),
  ],
  providers: [PanierService],
  controllers: [PanierController],
})
export class PanierModule {}
