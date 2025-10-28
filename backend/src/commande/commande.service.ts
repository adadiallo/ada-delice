import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Commande } from './entites/commande.entity';
import { PanierItem } from 'src/panier/entities/panier-item.entity';
import { CommandeItem } from './entites/commande-item.entity';

@Injectable()
export class CommandeService {
  constructor(
    @InjectRepository(Commande)
    private commandeRepo: Repository<Commande>,

    @InjectRepository(PanierItem)
    private panierRepo: Repository<PanierItem>,

    @InjectRepository(CommandeItem)
    private commandeItemRepo: Repository<CommandeItem>,
  ) {}

  // ✅ Valider une commande
 async validerCommande(userId: number, currency: string) {
  const panier = await this.panierRepo.find({
    where: { user: { id: userId } },
    relations: ['menu'],
  });

  if (!panier.length) throw new BadRequestException('Panier vide');

  const total = panier.reduce((acc, item) => acc + item.menu.prix * (item.quantite || 1), 0);

  const commande = this.commandeRepo.create({
    user: { id: userId },
    total,
    statut: 'en attente',
  });
  await this.commandeRepo.save(commande);

  const commandeItems = panier.map(item =>
    this.commandeItemRepo.create({
      commande,
      menu: item.menu,
      quantite: item.quantite || 1,
    }),
  );
  await this.commandeItemRepo.save(commandeItems);

  await this.panierRepo.delete({ user: { id: userId } });

  const commandeAvecItems = await this.commandeRepo.findOne({
    where: { id: commande.id },
    relations: ['items', 'items.menu', 'user'],
  });

  return commandeAvecItems;
}


  // ✅ Récupérer toutes les commandes
  async getAllCommandes() {
    return this.commandeRepo.find({
      relations: ['user', 'items', 'items.menu'],
    });
  }
  async changerStatut(id: number, statut: 'en attente' | 'validée' | 'livrée') {
  const commande = await this.commandeRepo.findOne({ where: { id } });
  if (!commande) throw new BadRequestException('Commande non trouvée');

  commande.statut = statut;
  await this.commandeRepo.save(commande);

  return { id: commande.id, statut: commande.statut };
}

}
