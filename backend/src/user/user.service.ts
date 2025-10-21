import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
constructor(@InjectRepository(User) private repo:Repository<User>){}
async findAll(){
    return this.repo.find()

}
async getUsersByRole(role: UserRole) {
  return this.repo.find({
    where: { role },
    select: ['id', 'email', 'nom', 'nomEntreprise', 'role'], 
  });
}

}

// async getUsersByRole(role: UserRole) {
//   return this.userRepo.find({
//     where: { role },
//     select: ['id', 'email', 'nom', 'nomEntreprise', 'role'], // éviter de retourner le mot de passe
//   });
// }
