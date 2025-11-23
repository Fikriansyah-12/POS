import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/enum/role.enum';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async registerUSer(registerDto: RegisterDto): Promise<{ message: string }> {
    const hashPassword = await bcrypt.hash(registerDto.password, 10);

    const userEmail = await this.prisma.user.findUnique({
      where: { email: registerDto.email },
    });

    const userName = await this.prisma.user.findFirst({
      where: { name: registerDto.username },
    });

    const nik = await this.prisma.user.findFirst({
      where: { username: registerDto.username },
    });

    if (userEmail) {
      throw new ConflictException('Email is already exist');
    }

    if (userName) {
      throw new ConflictException('Name is already exist');
    }

    if (nik) {
      throw new ConflictException('Nik is already exist');
    }

    const userCount = await this.prisma.user.count();
    const roleName = userCount === 0 ? Role.ADMIN : Role.KASIR;

    const role = await this.prisma.role.findUnique({
      where: { name: roleName },
    });

    if (!role) {
      throw new Error(`Role ${roleName} not found in database`);
    }

    await this.prisma.user.create({
      data: {
        name: registerDto.name,
        email: registerDto.email,
        username: registerDto.username,
        password: hashPassword,
        role: {
          connect: { id: role.id },
        },
      },
    });

    return {
      message: 'Register User Berhasil',
    };
  }

  async loginUser(loginDto: LoginDto): Promise<{
    access_token: string;
    user: {
      id: number;
      name: string;
      email: string;
      username: string;
      roleId?: number;
      role:string
    };
  }> {
    const user = await this.prisma.user.findUnique({
      where: { username: loginDto.username },
      include: {
        role: true
      }
    });

    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const passwordMatch = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const payload = {
      id: user.id,
      email: user.email,
      roleId: user.roleId,
      username: user.username,
      role: user.role.name 
    };

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        roleId: user.roleId,
        username: user.username,
        role: user.role.name
      },
      access_token: await this.jwtService.signAsync(payload, {  }),
    };
  }

  async getUser(id: number):Promise<User | null>{
    const user = await this.prisma.user.findUnique({where: {id}})

    return user
  }
}
