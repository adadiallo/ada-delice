import { Test, TestingModule } from '@nestjs/testing';
import { MenuEmployerController } from './menu-employer.controller';

describe('MenuEmployerController', () => {
  let controller: MenuEmployerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenuEmployerController],
    }).compile();

    controller = module.get<MenuEmployerController>(MenuEmployerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
