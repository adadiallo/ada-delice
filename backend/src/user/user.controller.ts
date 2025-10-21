import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
        constructor(private userService:UserService) {}
        @Get('entreprises')
getEntreprises() {
  return this.userService.getUsersByRole('entreprise');
}
@Get('employes')
getEmployes() {
  return this.userService.getUsersByRole('employee');
}

}
