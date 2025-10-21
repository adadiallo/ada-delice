import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Panier } from 'src/panier/entities/panier.entity';
import { User } from 'src/user/entities/user.entity';
import { Commande } from './entites/commande.entity';
import { CommandeItem } from './entites/commande-item.entity';

@Injectable()
export class CommandeService {
  constructor(
    @InjectRepository(Commande)
    private commandeRepository: Repository<Commande>,
    @InjectRepository(CommandeItem)
    private commandeItemRepository: Repository<CommandeItem>,
    @InjectRepository(Panier)
    private panierRepository: Repository<Panier>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createCommande(userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('Utilisateur non trouvé');

    const panier = await this.panierRepository.findOne({
      where: { user: { id: userId }, isValidated: false },
      relations: ['items', 'items.menu'],
    });

    if (!panier) throw new NotFoundException('Aucun panier trouvé');

    // Calcul du total
    const total = panier.items.reduce(
      (acc, item) => acc + Number(item.menu.prix) * item.quantity,
      0,
    );

    // Création de la commande
    const commande = this.commandeRepository.create({
      user,
      total,
      items: panier.items.map((item) =>
        this.commandeItemRepository.create({
          menu: item.menu,
          quantity: item.quantity,
          prix: item.menu.prix,
        }),
      ),
    });

    // Sauvegarde
    const savedCommande = await this.commandeRepository.save(commande);

    // Validation du panier
    panier.isValidated = true;
    await this.panierRepository.save(panier);

    return savedCommande;
  }
}
