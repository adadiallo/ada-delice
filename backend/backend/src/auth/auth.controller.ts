import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterEmployerDto } from './dto/register-employer.dto';
import { LoginEmployerDto } from './dto/login-employer.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }
  @Post('register-employer')
  registerEmployer(@Body() dto:RegisterEmployerDto){
    return this.authService.registerEmployer(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
   @Post('login-employer')
  loginEmployer(@Body() dto: LoginEmployerDto) {
    return this.authService.loginEmployer(dto);
  }
    @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user; // infos injectées depuis validate()
  }
}
