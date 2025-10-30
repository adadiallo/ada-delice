import { Controller, Post, Body, UseGuards, Req, Get, Param, Delete, ParseIntPipe, Patch } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PanierService } from './panier.service';

@Controller('panier')
export class PanierController {
  constructor(private panierService: PanierService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('add')
  async addToCart(
    @Req() req,
    @Body() body: { menuId: number; quantite: number }
  ) {
    const userId = req.user.userId; // récupéré depuis le token JWT
    return this.panierService.addToCart(userId, body.menuId, body.quantite);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getCart(@Req() req) {
    const userId = req.user.userId;
    return this.panierService.getCart(userId);
  }
@UseGuards(AuthGuard('jwt'))
@Patch('update')
async updateQuantite(
  @Req() req,
  @Body() body: { menuId: number; quantite: number }
) {
  const userId = req.user.userId;
  return this.panierService.updateQuantite(userId, body.menuId, body.quantite);
}

 @UseGuards(AuthGuard('jwt'))
@Delete('remove/:id')
async removeFromCart(
  @Req() req,
  @Param('id', ParseIntPipe) menuId: number
) {
  const userId = req.user.userId;
  return this.panierService.removeFromCart(userId,menuId);
}

  @UseGuards(AuthGuard('jwt'))
@Get('count')
async getCartItemCount(@Req() req) {
  const userId = req.user.userId;
  return this.panierService.getCartItemCount(userId);
}

}
