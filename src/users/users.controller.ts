import { Controller, Get, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';


@Controller('users')
@ApiTags('Users Controller')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard('jwt')) //pour que l'utilisateur puisse accéder à son profil
  findOne(@GetUser() user: User) {
    // findOne(@Request() req) {
    //   const userId = req.user.id;
    //   console.log(typeof userId);
      
    return this.usersService.findOne(user.id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }
}
