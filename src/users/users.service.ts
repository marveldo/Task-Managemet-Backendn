import { Injectable, BadRequestException , HttpStatus , InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserCreateDto ,LoginDto } from './user-model';
import { User } from 'src/generated/client';
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';


export type UserW = Omit <User ,'password'> 

@Injectable()
export class UsersService {

    private readonly prisma : ReturnType<PrismaService['extendPrismaClient']>
    
    constructor(private prismaclient : PrismaService , private Jwtservice : JwtService){
        this.prisma = prismaclient.extendPrismaClient()

    }
    
    private async hashpassword (password : string){
        const saltrounds = 10
        return await bcrypt.hash(password , saltrounds)
    }

    private async verifypassword(password: string , user_password : string){
        const is_match = await bcrypt.compare(password , user_password)
        if (is_match === false){
         throw new UnauthorizedException({
            statusCode : HttpStatus.UNAUTHORIZED,
            message : "Invalid Credentials"
          })
        }
    }
    async Create_user (userdto : UserCreateDto) : Promise<UserW> {
        try {
         const userdata = {
            username : userdto.username ,
            password : await this.hashpassword(userdto.password)
         }
         const user = await this.prisma.user.create({ 
           data : userdata, 
           include : {
            tasks : true
            },
           omit : {
            password : true
           }
          })

         return user

        }
        catch(error){
            if(error.code && error.meta){
                throw new BadRequestException({
                    message : 'Username Already exists',
                    statusCode : HttpStatus.BAD_REQUEST
                })
            }
            else {
                throw new InternalServerErrorException()
            }
        }

    }

    async SignIn(LoginDto : LoginDto){
       const {username , password} = LoginDto
       const user : User | null = await this.prisma.user.findUnique({
        where : {
            username : username
        }
       })

       if(!user){
          throw new UnauthorizedException({
            statusCode : HttpStatus.UNAUTHORIZED,
            message : "Invalid Credentials"
          })
       }
       this.verifypassword(password , user.password)
       
       return {
        access : this.Jwtservice.sign({username : user.username , id : user.id })
       }
       
    }



}
