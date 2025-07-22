import {IsNotEmpty, IsString, IsStrongPassword} from 'class-validator'
import { IsSimilar } from './custom-user-validation'


export class UserCreateDto {
    @IsNotEmpty()
    @IsString()
    username : string ;
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
    @IsNotEmpty()
    @IsString()
    @IsSimilar('password', {
        message : 'Passwords Dont Match'
    })
    password1 : string 

}

export class LoginDto {
    @IsNotEmpty()
    @IsString()
    username : string ;
    @IsNotEmpty()
    @IsString()
    password : string 
}