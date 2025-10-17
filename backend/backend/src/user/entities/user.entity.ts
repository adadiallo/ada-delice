import { Panier } from 'src/panier/entities/panier.entity';
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

  @OneToMany(() => Panier, (panier) => panier.user)
  paniers: Panier[];
}
