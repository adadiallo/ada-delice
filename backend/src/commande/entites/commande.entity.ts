import { User } from 'src/user/entities/user.entity';
import { CommandeItem } from './commande-item.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';

@Entity()
export class Commande {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.commandes, { onDelete: 'CASCADE' })
  user: User;

  @OneToMany(() => CommandeItem, (item) => item.commande, { cascade: true })
items: CommandeItem[];


  @Column({ default: 0 })
  total: number;

  @Column({ default: 'en attente' })
  statut: string;

  @CreateDateColumn()
  createdAt: Date;
}
