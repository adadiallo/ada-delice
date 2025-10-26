// src/panier/panier.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PanierItem } from './entities/panier-item.entity';


@Injectable()
export class PanierService {
  constructor(
    @InjectRepository(PanierItem)
    private panierRepository: Repository<PanierItem>,
  ) {}

  // Ajouter un produit au panier ou mettre à jour la quantité si déjà présent
  async addToCart(userId: number, menuId: number, quantite: number) {
    let item = await this.panierRepository.findOne({
      where: { user: { id: userId }, menu: { id: menuId } },
    });

    if (item) {
      item.quantite += quantite;
    } else {
      item = this.panierRepository.create({
        user: { id: userId },
        menu: { id: menuId },
        quantite,
      });
    }

    return this.panierRepository.save(item);
  }

  // Récupérer le panier d’un utilisateur
 // Récupérer le panier d’un utilisateur
async getCart(userId: number) {
  const panier = await this.panierRepository.find({
    where: { user: { id: userId } },
    relations: ['menu'],
  });

  return panier.map(item => ({
    id: item.menu.id,
    nom: item.menu.nom,
    description:item.menu.description,
    prix: item.menu.prix,
    image: item.menu.image,
    quantite: item.quantite,
  }));
}



  // ✅ MISE À JOUR DE LA QUANTITÉ
  async updateQuantite(userId: number, menuId: number, quantite: number) {
    const panierItem = await this.panierRepository.findOne({
      where: {
        user: { id: userId },
        menu: { id: menuId },
      },
      relations: ['user', 'menu'],
    });

    if (!panierItem) {
      throw new NotFoundException('Menu non trouvé dans le panier');
    }

    panierItem.quantite = quantite;
    return this.panierRepository.save(panierItem);
  }













  // Supprimer un produit du panier
  async removeFromCart(userId: number, menuId: number) {
    return this.panierRepository.delete({
      user: { id: userId },
      menu: { id: menuId },
    });
  }
  async getCartItemCount(userId: number): Promise<{ count: number }> {
  const count = await this.panierRepository.count({
    where: { user: { id: userId } }, 
  });

  return { count };
}

}
