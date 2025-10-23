// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { User, UserRole } from './entities/user.entity';
// import { Repository } from 'typeorm';

// @Injectable()
// export class UserService {
// constructor(@InjectRepository(User) private repo:Repository<User>){}
// async findAll(){
//     return this.repo.find()

// }
// async getUsersByRole(role: UserRole) {
//   return this.repo.find({
//     where: { role },
//     select: ['id', 'email', 'nom', 'nomEntreprise', 'role'], 
//   });
// }

// }
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async getUsersByRole(role: 'entreprise' | 'employee' | 'admin') {
    return this.userRepo.find({
      where: { role },
      select:
        role === 'entreprise'
          ? ['id', 'nomEntreprise', 'email'] // 🔹 Pour ton select et ton tableau
          : ['id', 'nom', 'email', 'nomEntreprise'],
    });
  }
}


