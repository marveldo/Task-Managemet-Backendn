import { Controller , Post , Body, UseGuards, Get, Req } from '@nestjs/common';
import { UserW } from './users.service';
import { UserCreateDto , LoginDto } from './user-model';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('auth')
export class UsersController {

    constructor( private userservice : UsersService){}
    
    @Post('/signUp/')
    
    CreateUser(@Body() user_obj : UserCreateDto) : Promise<UserW>{
        return this.userservice.Create_user(user_obj)
    }

    @Post('/signIn/')

    LoginUser(@Body() loginobj : LoginDto) : Promise<{access : string}> {
        return this.userservice.SignIn(loginobj)
    }
    
    @Get('/user/')
    @UseGuards(AuthGuard('jwt'))
    GetUser(@Req() req : Request){
        return req.user
    }


}


