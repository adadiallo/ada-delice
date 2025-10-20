import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommandeService } from './commande.service';
import { CommandeController } from './commande.controller';
import { Panier } from 'src/panier/entities/panier.entity';
import { User } from 'src/user/entities/user.entity';
import { Commande } from './entites/commande.entity';
import { CommandeItem } from './entites/commande-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Commande, CommandeItem, Panier, User])],
  controllers: [CommandeController],
  providers: [CommandeService],
})
export class CommandeModule {}
