import { Controller, Post, UseGuards, Req, Body, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommandeService } from './commande.service';

@Controller('commandes')
export class CommandeController {
  constructor(private commandeService: CommandeService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('valider')
  async validerCommande(@Req() req, @Body('currency') currency: string) {
    const userId = req.user.userId;
    return this.commandeService.validerCommande(userId, currency);
  }
 @UseGuards() // si tu as un guard admin
@Get('all')
async getAllCommandes() {
  return this.commandeService.getAllCommandes();
}

}

