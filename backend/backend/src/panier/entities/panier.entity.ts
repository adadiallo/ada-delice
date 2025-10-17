import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { PanierItem } from './panier-item.entity';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Panier {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.paniers)
  user: User;

  @OneToMany(() => PanierItem, (item) => item.panier, { cascade: true, eager: true })
  items: PanierItem[];

  @Column({ type: 'boolean', default: false })
  isValidated: boolean; 
}
