import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Commande } from './commande.entity';
import { MenuEmployer } from 'src/menu-employer/entities/menu-employer.entity';
export type StatutCommande = 'en attente' | 'validée' | 'livrée';

@Entity()
export class CommandeItem {
  @PrimaryGeneratedColumn()
  id: number;

 @ManyToOne(() => Commande, (commande) => commande.items, { onDelete: 'CASCADE' })
commande: Commande;

@ManyToOne(() => MenuEmployer)
menu: MenuEmployer;

@Column({ type: 'int', nullable: false, default: 1 })
quantite: number;
@Column({ type: 'enum', enum: ['en attente', 'validée', 'livrée'], default: 'en attente' })
  statut: StatutCommande;

}
