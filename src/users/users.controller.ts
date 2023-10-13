import { Controller, Get, Body, Patch, Param, Delete, UseGuards, Request, Put, UseInterceptors, ClassSerializerInterceptor, ForbiddenException } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';


@Controller('users')
@ApiTags('Users Controller')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findOne(@GetUser() user: User) {
    console.log(user);

    return this.usersService.findOne(user.id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
    @GetUser() user: User,
  ): Promise<User> {
    return this.usersService.update(user.id, id, updateUserDto);
  }

  @Delete()
  @UseGuards(AuthGuard('jwt'))
  deleteUser( @GetUser() user: User) {
    console.log(user);
    const userId = user.id

    return this.usersService.deleteUser(+userId);
  }

  // @Delete(':id')
  // @UseGuards(AuthGuard('jwt'))
  // deleteUser(@Param('id') id: number, @GetUser() user: User) {
  //   console.log(user);

  //   // Valider si l'utilisateur connecté a le droit de supprimer ce compte
  //   if (user.id !== id) {
  //     throw new ForbiddenException(
  //       'Vous n’avez pas les droits pour supprimer ce compte.',
  //     );
  //   }
  //   return this.usersService.deleteUser(id);
  // }
}
