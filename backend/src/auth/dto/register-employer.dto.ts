import { IsEmail, IsNotEmpty } from "class-validator";


export class RegisterEmployerDto{
    @IsNotEmpty()
  nom: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  entrepriseId: number; 
}