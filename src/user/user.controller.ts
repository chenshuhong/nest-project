import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schema/user.schema';
import { LoginDto } from './dto/login.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService){}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    await this.userService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('login')
  async login(@Body() loginDto: LoginDto){
    if(!loginDto.username&&!loginDto.password){
      return new BadRequestException()
    }
    const user = await this.userService.login(loginDto)
    if(user){
      return {
        code:0,
        data:user
      }
    }
    throw new UnauthorizedException('User Not Found');
  }
}
