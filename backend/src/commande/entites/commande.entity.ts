import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { CommandeItem } from "./commande-item.entity";

@Entity()
export class Commande {
    @PrimaryGeneratedColumn()
    id:number;
    
    @ManyToOne(() => User ,(user) => user.commandes)
    user:User;
    @Column({type:'decimal',precision:10,scale:2})
    total:number;
    @OneToMany(() => CommandeItem,(item) =>item.commande, {cascade:true})
    items:CommandeItem[];
    @Column({default:'en_attente'})
    statut:string;
@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
dateCommande: Date;
}