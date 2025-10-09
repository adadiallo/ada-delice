export class CreateMenuEmployerDto {
  type: 'petit_dejeuner' | 'repas';
  prix: number  ;
  nom: string;   
  description:string; 
  jour?: string;
  image?:string;
}
