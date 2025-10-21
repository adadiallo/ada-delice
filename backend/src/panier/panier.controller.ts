import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { PanierService } from './panier.service';
import { CreatePanierDto } from './dto/create-panier.dto';

@Controller('panier')
export class PanierController {
  constructor(private readonly panierService: PanierService) {}

  @Post()
  create(@Body() createPanierDto: CreatePanierDto) {
    return this.panierService.create(createPanierDto);
  }

  @Get(':userId')
  getByUser(@Param('userId') userId: number) {
    return this.panierService.getByUser(userId);
  }

  @Patch('validate/:panierId')
  validate(@Param('panierId') panierId: number) {
    return this.panierService.validatePanier(panierId);
  }

  @Patch('update-item/:itemId/:quantity')
  updateItem(@Param('itemId') itemId: number, @Param('quantity') quantity: number) {
    return this.panierService.updateQuantity(itemId, quantity);
  }

  @Delete('remove-item/:itemId')
  removeItem(@Param('itemId') itemId: number) {
    return this.panierService.removeItem(itemId);
  }
}
