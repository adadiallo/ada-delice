import { Controller, Post, UseGuards, Req, Body, Get, Patch, Param } from '@nestjs/common';
import { CommandeService } from './commande.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('commandes')
export class CommandeController {
  constructor(private readonly commandeService: CommandeService) {}

  @UseGuards(JwtAuthGuard)
  @Post('valider')
  async validerCommande(@Req() req, @Body('currency') currency: string) {
    const userId = req.user.userId;
    return this.commandeService.validerCommande(userId, currency);
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async getAllCommandes() {
    return this.commandeService.getAllCommandes();
  }
   @UseGuards(JwtAuthGuard)
  @Patch(':id/statut')
  async changerStatut(
    @Param('id') id: string,
    @Body('statut') statut: 'en attente' | 'validée' | 'livrée',
  ) {
    return this.commandeService.changerStatut(+id, statut);
  }
}
