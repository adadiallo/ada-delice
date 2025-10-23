import { Injectable, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.userRepo.findOne({ where: { email: dto.email } });
    if (existingUser) {
      throw new ConflictException('Email déjà utilisé');
    }

    const allowedRoles = ['admin', 'entreprise', 'employee'];
    if (dto.role && !allowedRoles.includes(dto.role)) {
      throw new BadRequestException('Rôle invalide');
    }
    let entrepriseName: string | undefined
    if (dto.role === 'employee'){
      if(!dto.nomEntreprise){
              throw new BadRequestException("Le nom de l'entreprise est obligatoire pour un employé");

      }
       const entreprise = await this.userRepo.findOne({
      where:{nomEntreprise:dto.nomEntreprise, role:'entreprise'}
    });
    if(!entreprise){
      throw new BadRequestException("L'entreprise choisie n'existe pas")
    }
entrepriseName=entreprise.nomEntreprise;

    }
   
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = this.userRepo.create({
      email: dto.email,
      password: hashedPassword,
      nom: dto.nom || 'inconnu',
      nomEntreprise: dto.role === 'entreprise' ? dto.nomEntreprise:entrepriseName,
      role: dto.role || 'employee',
    });

    await this.userRepo.save(user);

    return {
      message: 'Utilisateur créé avec succès',
      user: {
        id: user.id,
        email: user.email,
        nom: user.nom,
        nomEntreprise: user.nomEntreprise,
        role: user.role,
      },
    };
  }

  async login(dto: LoginDto) {
    const user = await this.userRepo.findOne({ where: { email: dto.email } });
    if (!user) {
      throw new UnauthorizedException('Compte non trouvé');
    }
  


    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Mot de passe incorrect');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
      user: {
        id: user.id,
        email: user.email,
        nom: user.nom,
        nomEntreprise: user.nomEntreprise,
        role: user.role,
        entrepriseId: user.entrepriseId,
      },
    };
  }
}
