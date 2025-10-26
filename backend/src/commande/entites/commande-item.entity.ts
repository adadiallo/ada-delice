// import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
// import { Commande } from './commande.entity';
// import { MenuEmployer } from 'src/menu-employer/entities/menu-employer.entity';

// @Entity()
// export class CommandeItem {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @ManyToOne(() => Commande, (commande) => commande.items)
//   commande: Commande;

//   @ManyToOne(() => MenuEmployer)
//   menu: MenuEmployer;

//   @Column()
//   quantity: number;

//   @Column({ type: 'decimal', precision: 10, scale: 2 })
//   prix: number;
// }
