// menu.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MenuEmployer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: 'petit_dejeuner' | 'repas';

@Column({ type: 'int', default: 0 })
  prix: number;

  @Column()
  nom: string;
  @Column()
  description: string;
  @Column({ nullable: true })
  jour?: string;
  @Column({ nullable: true })
  image?: string;
}
