import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export type UserRole = 'entreprise' | 'employee';

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
    enum: ['entreprise', 'employee'],
    default: 'employee',
  })
  role: UserRole;

  // Seul applicable si l’utilisateur est un employé
  @Column({ nullable: true })
  entrepriseId: number;
}
