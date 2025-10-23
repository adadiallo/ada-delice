// create-commande.dto.ts
import { IsInt, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class CommandeItemDto {
  @IsInt()
  menuId: number;

  @IsInt()
  quantity: number;
}

export class CreateCommandeDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CommandeItemDto)
  items: CommandeItemDto[];
}
