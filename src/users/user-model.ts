import {IsNotEmpty, IsString, IsStrongPassword} from 'class-validator'
import { IsSimilar } from './custom-user-validation'
import { ApiProperty , OmitType} from '@nestjs/swagger';
import { User } from '../generated/client';
import { Task } from '../generated/client';
import { Taskresponse } from '../tasks/tasks.model';


export class UserCreateDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    username : string ;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsStrongPassword({
        minLength : 10 ,
        minUppercase : 1 ,
        minLowercase : 1 ,
        minNumbers : 1,
        minSymbols : 1
    }, {
        message : 'Password is to Weak'
    })
    password : string ;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsSimilar('password', {
        message : 'Passwords Dont Match'
    })
    password1 : string 

}

export class LoginDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    username : string ;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password : string 
}

export class UserResponse implements Omit<User , 'password'>{
    @ApiProperty()
    id : string ;
    @ApiProperty()
    username: string;
    @ApiProperty()
    tasks : Taskresponse[]
}

export class LoginResponse {
    @ApiProperty()
    access : string
}