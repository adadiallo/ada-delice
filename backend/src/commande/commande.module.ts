import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommandeService } from './commande.service';
import { CommandeController } from './commande.controller';
import { User } from 'src/user/entities/user.entity';
import { Commande } from './entites/commande.entity';
import { PanierItem } from 'src/panier/entities/panier-item.entity';
import { CommandeItem } from './entites/commande-item.entity';

@Module({
  controllers: [CommandeController],
  providers: [CommandeService],
  imports: [TypeOrmModule.forFeature([Commande,CommandeItem, PanierItem, User])],
})
export class CommandeModule {}
