import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Commande } from "./entites/commande.entity";
import { Repository } from "typeorm";
import { CommandeItem } from "./entites/commande-item.entity";
import { Panier } from "src/panier/entities/panier.entity";
import { User } from "src/user/entities/user.entity";
import { PanierService } from "src/panier/panier.service";
import { CreateCommandeDto } from "./dto/create-commande.dto";

@Injectable()
export class CommandeService {
  constructor(
    @InjectRepository(Commande)
    private commandeRepository: Repository<Commande>,
    @InjectRepository(CommandeItem)
    private commandeItemRepository: Repository<CommandeItem>,
    private panierService: PanierService, // on utilise le service panier
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createCommande(userId: number, createCommandeDto: CreateCommandeDto) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('Utilisateur non trouvé');

    const panier = await this.panierService.getOrCreatePanier(userId);

    if (!panier.items || panier.items.length === 0) {
      return { success: false, message: 'Votre panier est vide', commande: null };
    }

    const total = panier.items.reduce((sum, i) => sum + Number(i.menu.prix) * i.quantity, 0);

    const commande = this.commandeRepository.create({
      user: { id: userId },
      total,
      items: panier.items.map(item =>
        this.commandeItemRepository.create({
          menu: item.menu,
          quantity: item.quantity,
          prix: item.menu.prix,
        }),
      ),
    });

    const savedCommande = await this.commandeRepository.save(commande);

    panier.isValidated = true;
await this.panierService.savePanier(panier); // plus d'erreur

    return { success: true, message: 'Commande validée avec succès !', commande: savedCommande };
  }
}

