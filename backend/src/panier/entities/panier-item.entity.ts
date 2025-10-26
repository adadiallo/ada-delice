
import { MenuEmployer } from "src/menu-employer/entities/menu-employer.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PanierItem {
    @PrimaryGeneratedColumn()
    id:number;
    @ManyToOne(() => User,user => user.paniers, {onDelete:'CASCADE'})
    @JoinColumn({name: 'userId'})
    user:User;
    @ManyToOne(() => MenuEmployer,{eager:true})
    @JoinColumn({name: 'menuId'})
    menu:MenuEmployer;
@Column({ default: 1 })
quantite: number;
}