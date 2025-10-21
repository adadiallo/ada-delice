import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuEmployerService } from './menu-employer.service';
import { MenuEmployerController } from './menu-employer.controller';
import { MenuEmployer } from './entities/menu-employer.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  imports: [TypeOrmModule.forFeature([MenuEmployer])], // <-- important !
  controllers: [MenuEmployerController],
  providers: [MenuEmployerService,CloudinaryService],
})
export class MenuEmployerModule {}
