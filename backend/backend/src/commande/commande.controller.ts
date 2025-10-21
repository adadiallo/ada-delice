import { Controller, Post, Param, ParseIntPipe } from '@nestjs/common';
import { CommandeService } from './commande.service';

@Controller('commande')
export class CommandeController {
  constructor(private readonly commandeService: CommandeService) {}

 @Post(':userId')
create(@Param('userId', ParseIntPipe) userId: number) {
  return this.commandeService.createCommande(userId);
}
}
