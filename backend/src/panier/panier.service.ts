import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Panier } from './entities/panier.entity';
import { PanierItem } from './entities/panier-item.entity';
import { MenuEmployer } from '../menu-employer/entities/menu-employer.entity';
import { CreatePanierDto } from './dto/create-panier.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class PanierService {
  constructor(
    @InjectRepository(Panier)
    private panierRepository: Repository<Panier>,
    @InjectRepository(PanierItem)
    private panierItemRepository: Repository<PanierItem>,
    @InjectRepository(MenuEmployer)
    private menuRepository: Repository<MenuEmployer>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Récupère ou crée un panier non validé
  async getOrCreatePanier(userId: number) {
    let panier = await this.panierRepository.findOne({
      where: { user: { id: userId }, isValidated: false },
      relations: ['items', 'items.menu'],
    });

    if (!panier) {
      panier = this.panierRepository.create({
        user: { id: userId }, // <-- seulement l'id
        isValidated: false,
      });
      await this.panierRepository.save(panier);
    }

    return panier;
  }

  async addItem(userId: number, menuId: number, quantity: number) {
    const panier = await this.getOrCreatePanier(userId);
    const menu = await this.menuRepository.findOne({ where: { id: menuId } });
    if (!menu) throw new NotFoundException('Menu non trouvé');

    let item = panier.items?.find(i => i.menu.id === menuId);
    if (item) {
      item.quantity += quantity;
      await this.panierItemRepository.save(item);
    } else {
      item = this.panierItemRepository.create({ menu, quantity, panier });
      await this.panierItemRepository.save(item);
      panier.items = panier.items ? [...panier.items, item] : [item];
    }

    return panier;
  }

  async removeItem(itemId: number) {
    const item = await this.panierItemRepository.findOne({ where: { id: itemId } });
    if (!item) throw new NotFoundException('Item non trouvé');
    await this.panierItemRepository.remove(item);
  }

  async updateQuantity(itemId: number, quantity: number) {
    const item = await this.panierItemRepository.findOne({ where: { id: itemId } });
    if (!item) throw new NotFoundException('Item non trouvé');
    item.quantity = quantity;
    await this.panierItemRepository.save(item);
  }
  async savePanier(panier: Panier) {
  return this.panierRepository.save(panier);
}

}

