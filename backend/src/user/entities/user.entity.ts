import { Commande } from 'src/commande/entites/commande.entity';
import { PanierItem } from 'src/panier/entities/panier-item.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

export type UserRole = 'entreprise' | 'employee' | 'admin';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  nomEntreprise?: string;

  @Column({ default: 'inconnu' })
  nom: string;

  @Column({
    type: 'enum',
    enum: ['entreprise', 'employee', 'admin'],
    default: 'employee',
  })
  role: UserRole;

  @Column({ nullable: true })
  entrepriseId: number;

 @OneToMany(() => PanierItem, (panier) => panier.user)
  paniers: PanierItem[];
  @OneToMany(() => Commande ,(commande) => commande.user )
  commandes:Commande
}