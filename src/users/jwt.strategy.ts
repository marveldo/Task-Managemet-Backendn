import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { UserW } from "./users.service";
import { PrismaService } from "src/prisma/prisma.service";

interface Payload {
    username : string ,
    id : string ,
    iat : string,
    exp : string
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy , 'jwt'){
    private readonly prisma : ReturnType<PrismaService['extendPrismaClient']>
    constructor (
        private readonly  prismaclient : PrismaService 
     ){
      super({
        jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey : process.env.SECRET_KEY as string
      })
      this.prisma = prismaclient.extendPrismaClient()
    }

    async validate(payload : Payload): Promise<UserW> {
        const user : UserW | null = await this.prisma.user.findUnique({
            where : {
                id : payload.id
            },
            omit : {
                password : true
            }
        })

        if(!user){
            throw new UnauthorizedException({
                statusCode : HttpStatus.UNAUTHORIZED,
                message : 'User Not Authorized'
            })
        }
       
        return user
    }
}