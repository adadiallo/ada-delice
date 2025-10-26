import { User } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Commande {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.commandes, { onDelete: 'CASCADE' })
  user: User;

 @Column('json', { nullable: true })
menus: { menu: any; quantite: number }[];


@Column({ default: 0 })
  total: number;

  @Column({ default: 'en attente' })
  statut: string;
}
