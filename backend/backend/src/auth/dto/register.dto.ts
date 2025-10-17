import { IsEmail, IsNotEmpty, MinLength, IsEnum, IsOptional, IsNumber } from 'class-validator';
import { UserRole } from 'src/user/entities/user.entity';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsEnum(['admin', 'entreprise', 'employee'])
  role: UserRole | 'admin';

  @IsOptional()
  nomEntreprise?: string; 

  @IsOptional()
  nom?: string; 

  @IsOptional()
  @IsNumber()
  entrepriseId?: number;
}
