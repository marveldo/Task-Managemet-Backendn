import { Controller , Post , Body, UseGuards, Get, Req, HttpStatus } from '@nestjs/common';
import { UserW } from './users.service';
import { UserCreateDto , LoginDto, UserResponse, LoginResponse } from './user-model';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { ApiResponse } from '@nestjs/swagger';
import { BadRequestResponse } from 'src/tasks/tasks.model';

@Controller('auth')
export class UsersController {

    constructor( private userservice : UsersService){}
    
    @Post('/signUp/')
    @ApiResponse({
        status : HttpStatus.OK,
        description : 'Successful User Signup',
        type : UserResponse
    })
    @ApiResponse({
        status : HttpStatus.BAD_REQUEST,
        description : 'On Bad request',
        type : BadRequestResponse
    })
    CreateUser(@Body() user_obj : UserCreateDto) : Promise<UserW>{
        return this.userservice.Create_user(user_obj)
    }

    @Post('/signIn/')
    @ApiResponse({
        status : HttpStatus.OK,
        description : 'Successful User Login',
        type : LoginResponse
    })
    @ApiResponse({
        status : HttpStatus.UNAUTHORIZED,
        description : 'Unauthorized',
        type : BadRequestResponse
    })
    LoginUser(@Body() loginobj : LoginDto) : Promise<{access : string}> {
        return this.userservice.SignIn(loginobj)
    }
    
    @Get('/user/')
    @UseGuards(AuthGuard('jwt'))
        @ApiResponse({
        status : HttpStatus.OK,
        description : 'Fetching User',
        type : UserResponse
    })
    @ApiResponse({
        status : HttpStatus.UNAUTHORIZED,
        description : 'Unauthorized',
        type : BadRequestResponse
    })
    GetUser(@Req() req : Request){
        return req.user
    }


}


