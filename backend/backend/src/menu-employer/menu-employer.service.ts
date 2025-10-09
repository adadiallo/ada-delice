// menu.service.ts
import { Injectable } from '@nestjs/common';
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

}
