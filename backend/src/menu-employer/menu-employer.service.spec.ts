import { Test, TestingModule } from '@nestjs/testing';
import { MenuEmployerService } from './menu-employer.service';

describe('MenuEmployerService', () => {
  let service: MenuEmployerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MenuEmployerService],
    }).compile();

    service = module.get<MenuEmployerService>(MenuEmployerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
