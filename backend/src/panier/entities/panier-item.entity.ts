import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Panier } from './panier.entity';
import { MenuEmployer } from 'src/menu-employer/entities/menu-employer.entity';

@Entity()
export class PanierItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => MenuEmployer)
  menu: MenuEmployer;

  @Column()
  quantity: number;

  @ManyToOne(() => Panier, (panier) => panier.items)
  panier: Panier;
}
