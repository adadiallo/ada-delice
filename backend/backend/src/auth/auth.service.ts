import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/user/entities/user.entity';
import { RegisterEmployerDto } from './dto/register-employer.dto';
import { LoginEmployerDto } from './dto/login-employer.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    // Vérifier si l’email existe déjà
    const userExist = await this.userRepo.findOne({ where: { email: dto.email } });
    if (userExist) {
      throw new ConflictException('Email déjà utilisé');
    }


    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = this.userRepo.create({
      email: dto.email,
      password: hashedPassword,
      nomEntreprise: dto.nomEntreprise,
      role:'entreprise'
    });

    await this.userRepo.save(user);

    return {
      message: 'Utilisateur créé avec succès',
      user: {
        id: user.id,
        email: user.email,
        nomEntreprise: user.nomEntreprise,
      },
    };
  }
async registerEmployer(dto: RegisterEmployerDto) {
  // Vérifier si l’email existe déjà
  const existingUser = await this.userRepo.findOne({ where: { email: dto.email } });
  if (existingUser) {
    throw new ConflictException('Email déjà utilisé');
  }

  const hashedPassword = await bcrypt.hash(dto.password, 10);

  const employee = this.userRepo.create({
    nom: dto.nom,
    email: dto.email,
    password: hashedPassword,
    entrepriseId: dto.entrepriseId, // il faudra un champ dans la table User pour ça
    role: 'employee', // optionnel : pour différencier entreprise / employé
  });

  await this.userRepo.save(employee);

  return {
    message: 'Employé créé avec succès',
    employee: {
      id: employee.id,
      nom: employee.nom,
      email: employee.email,
    },
  };
}


  // 🔹 Connexion
  async login(dto: LoginDto) {
    const user = await this.userRepo.findOne({ where: { email: dto.email } });
    if (!user || user.role !== 'entreprise') {
      throw new UnauthorizedException('Compte Entreprise non trouvé');
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Mot de passe incorrect');
    }

    // Créer le token JWT
    const payload = { sub: user.id, email: user.email };
    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
      user: {
        id: user.id,
        email: user.email,
        nomEntreprise: user.nomEntreprise,

      },
    };
  }
  async loginEmployer(dto: LoginEmployerDto) {
    const user = await this.userRepo.findOne({ where: { email: dto.email } });
    if (!user || user.role !== 'employee') {
      throw new UnauthorizedException('Compte employée non trouvé');
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Mot de passe incorrect');
    }

    // Créer le token JWT
    const payload = { sub: user.id, email: user.email };
    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
      employee: {
        id: user.id,
        email: user.email,
        nom: user.nom,
        entrepriseId:user.entrepriseId
      
      },
    };
  }
}
