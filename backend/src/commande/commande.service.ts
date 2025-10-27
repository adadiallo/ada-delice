import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Commande } from './entites/commande.entity';
import { PanierItem } from 'src/panier/entities/panier-item.entity';

@Injectable()
export class CommandeService {
  constructor(
    @InjectRepository(Commande)
    private commandeRepo: Repository<Commande>,
    @InjectRepository(PanierItem)
    private panierRepo: Repository<PanierItem>,
  ) {}

  async validerCommande(userId: number,currency: string) {
    const panier = await this.panierRepo.find({
      where: { user: { id: userId } },
      relations: ['menu'],
    });

    if (!panier.length) {
      throw new BadRequestException('Votre panier est vide');
    }

    const total = panier.reduce(
      (acc, item) => acc + item.menu.prix * item.quantite,
      0,
    );

    const commande = this.commandeRepo.create({
      user: { id: userId },
      menus: panier.map((item) => ({
        menu: item.menu,
        quantite: item.quantite,
      })),
      total,
      statut: 'en attente',
    });

    await this.commandeRepo.save(commande);

    await this.panierRepo.delete({ user: { id: userId } });

   

    return {
      commande,
    };
  }

 async getAllCommandes() {
  return this.commandeRepo.find({
    relations: ['user', 'menus', 'menus.menu'],
  });
}

}
