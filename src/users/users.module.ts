import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import {PassportModule , IAuthModuleOptions} from "@nestjs/passport"
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports : [PrismaModule , 
             PassportModule.register({
              defaultStrategy : 'jwt'
             }) ,
             JwtModule.register({
              secret : process.env.SECRET_KEY,
              signOptions : {
                algorithm : 'HS256',
                expiresIn : "10h",
                header : {
                  alg : 'HS256',
                  typ : 'JWT'
                }
              }
              })
            ],
  providers: [UsersService, JwtStrategy],
  controllers: [UsersController]
})
export class UsersModule {}
