import { isEmpty, IsEnum, IsNotEmpty, IsOptional} from "class-validator"
import { ApiProperty } from "@nestjs/swagger";
export class TaskDTO {
    @ApiProperty()
    @IsNotEmpty()
    name : string ;
    
    @ApiProperty()
    @IsNotEmpty()
    description : string
}

export enum STATUS {
    OPEN = 'OPEN',
    ISPENDING = 'ISPENDING',
    COMPLETED = 'COMPLETED'
}
export class TaskUpdateDTO {

    @ApiProperty()
    name? : string ;

    @ApiProperty()
    description? : string;

    @ApiProperty()
    @IsEnum(STATUS)
    status? : STATUS;

}

export class TaskFilterDTO {

    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    name? : string ;
    
    @ApiProperty()
    @IsOptional()
    @IsEnum(STATUS)
    status? : STATUS
}

export interface Task {
    id : string ,
    name : string,
    description : string
    status : STATUS,
    user_id : string | null
}

export class Taskresponse {
    @ApiProperty()
    id : string ;
    @ApiProperty()
    name : string;
    @ApiProperty()
    description : string;
    @ApiProperty()
    status : STATUS;
    @ApiProperty()
    user_id : string | null
}

export class BadRequestResponse {
    @ApiProperty()
    statusCode : number;

    @ApiProperty()
    message : string
}
