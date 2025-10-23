import { Controller, Post, Param, Body, ParseIntPipe } from '@nestjs/common';
import { CommandeService } from './commande.service';
import { CreateCommandeDto } from './dto/create-commande.dto';

@Controller('commande')
export class CommandeController {
  constructor(private readonly commandeService: CommandeService) {}

  @Post(':userId')
  create(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() createCommandeDto: CreateCommandeDto
  ) {
    return this.commandeService.createCommande(userId, createCommandeDto);
  }
}
