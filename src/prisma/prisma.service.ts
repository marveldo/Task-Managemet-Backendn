import { Injectable , OnModuleInit , OnModuleDestroy } from "@nestjs/common";
import { PrismaClient } from "../../src/generated/client";
import { withAccelerate } from "@prisma/extension-accelerate";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit , OnModuleDestroy{
    async onModuleInit() {
        await this.$connect()
    }

    async onModuleDestroy() {
        await this.$disconnect()
    }
    extendPrismaClient()  {
        return this.$extends(withAccelerate())
    }

}