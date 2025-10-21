import { IsEmail, IsNotEmpty } from "class-validator";


export class LoginEmployerDto{
     @IsEmail()
      email: string;
    
      @IsNotEmpty()
      password: string;
       
      
}