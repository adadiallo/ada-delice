// menu.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuEmployer } from './entities/menu-employer.entity';
import { CreateMenuEmployerDto } from './dto/create-menu-employer.dto';


@Injectable()
export class MenuEmployerService {
  constructor(
    @InjectRepository(MenuEmployer)
    private menuRepository: Repository<MenuEmployer>,
  ) {}

  create(createMenuDto: CreateMenuEmployerDto) {
    const menu = this.menuRepository.create(createMenuDto);
    return this.menuRepository.save(menu);
  }

  findAll() {
    return this.menuRepository.find();
  }

findByType(type: string) {
  if (type !== 'petit_dejeuner' && type !== 'repas') {
    throw new Error('Type invalide');
  }
  return this.menuRepository.find({ where: { type } });
}

async remove(id: number) {
  const menu = await this.menuRepository.findOne({ where: { id } });
  if (!menu) {
    throw new NotFoundException(`Menu avec ${id} non trouvé`);
  }
  await this.menuRepository.remove(menu);
  return { message: `Menu avec ${id} supprimé avec succès` };
}

async update(id: number, updateData: Partial<CreateMenuEmployerDto>) {
  const menu = await this.menuRepository.findOne({ where: { id } });
  if (!menu) {
    throw new NotFoundException(`Menu avec l'id ${id} non trouvé`);
  }

  Object.assign(menu, updateData);

  return this.menuRepository.save(menu);
}








}
