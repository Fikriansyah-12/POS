import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';
import { JwtAuthGuard } from './guard/jwt.guard';
import { authenticate } from 'passport';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.registerUSer(registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.loginUser(loginDto);
  }

  @Post('logout')
  @UseGuards(AuthGuard)
  logout() {
    return { message: 'Logout success' };
  }

  @Get('getUser')
  @UseGuards(AuthGuard)
  getMe(@Request() request: any) {
    return {
      authenticated: true,
      payload: request.user,
    };
  }
}
