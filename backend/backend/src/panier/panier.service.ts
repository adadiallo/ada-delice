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

async create(createPanierDto: CreatePanierDto) {
  const user = await this.userRepository.findOne({ where: { id: createPanierDto.userId } });
  if (!user) throw new NotFoundException('Utilisateur non trouvé');

  // Crée le panier sans items d'abord
  const panier = this.panierRepository.create({ user, isValidated: false });
  await this.panierRepository.save(panier);

  // Crée les items et les associe
  const items: PanierItem[] = [];
  for (const itemDto of createPanierDto.items) {
    const menu = await this.menuRepository.findOne({ where: { id: itemDto.menuId } });
    if (!menu) throw new NotFoundException(`Menu ${itemDto.menuId} non trouvé`);

    const panierItem = this.panierItemRepository.create({
      menu,
      quantity: itemDto.quantity,
      panier, // maintenant panier a un id
    });

    items.push(panierItem);
  }

  await this.panierItemRepository.save(items);

  // Recharge le panier avec les items
  panier.items = items;
  return panier;
}

  async getByUser(userId: number) {
    return this.panierRepository.find({
      where: { user: { id: userId }, isValidated: false },
    });
  }

  async validatePanier(panierId: number) {
    const panier = await this.panierRepository.findOne({ where: { id: panierId } });
    if (!panier) throw new NotFoundException('Panier non trouvé');
    panier.isValidated = true;
    return this.panierRepository.save(panier);
  }

  async removeItem(itemId: number) {
    const item = await this.panierItemRepository.findOne({ where: { id: itemId } });
    if (!item) throw new NotFoundException('Item non trouvé');
    return this.panierItemRepository.remove(item);
  }

  async updateQuantity(itemId: number, quantity: number) {
    const item = await this.panierItemRepository.findOne({ where: { id: itemId } });
    if (!item) throw new NotFoundException('Item non trouvé');
    item.quantity = quantity;
    return this.panierItemRepository.save(item);
  }
}
