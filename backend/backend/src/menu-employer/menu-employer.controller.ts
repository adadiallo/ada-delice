// menu.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';

import { MenuEmployerService } from './menu-employer.service';
import { CreateMenuEmployerDto } from './dto/create-menu-employer.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('menu-employer')
export class MenuEmployerController {
  constructor(
    private menuService: MenuEmployerService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}
  @Post()
    @UseGuards(JwtAuthGuard)

  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() dto: CreateMenuEmployerDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      console.log('DTO:', dto);
      console.log('File:', file);

      if (!file) throw new Error('Aucun fichier reçu');

      const result = await this.cloudinaryService.uploadImage(file);
      dto.image = result.secure_url;

      return this.menuService.create(dto);
    } catch (error) {
      console.error('Erreur lors de la création du menu:', error);
      throw error;
    }
  }

  @Get()
  findAll(@Query('type') type?: string) {
    if (type) return this.menuService.findByType(type);
    return this.menuService.findAll();
  }

  @Delete(":id")
  
  async remove(@Param('id') id:string){
    const menuId = parseInt(id,10);
    return this.menuService.remove(menuId)
  }

@Patch(':id')
@UseGuards(JwtAuthGuard)
@UseInterceptors(FileInterceptor('image'))
async update(
  @Param('id') id: string,
  @Body() dto: Partial<CreateMenuEmployerDto>,
  @UploadedFile() file?: Express.Multer.File
) {
  const menuId = parseInt(id, 10);

  // Si une image est uploadée, on l'envoie à Cloudinary
  if (file) {
    const result = await this.cloudinaryService.uploadImage(file);
    dto.image = result.secure_url;
  }

  return this.menuService.update(menuId, dto);
}

}
