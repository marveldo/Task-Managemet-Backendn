import { isEmpty, IsEnum, IsNotEmpty, IsOptional} from "class-validator"
export class TaskDTO {
    @IsNotEmpty()
    name : string ;

    @IsNotEmpty()
    description : string
}

export enum STATUS {
    OPEN = 'OPEN',
    ISPENDING = 'ISPENDING',
    COMPLETED = 'COMPLETED'
}
export class TaskUpdateDTO {

    
    name? : string ;
    description? : string;
    @IsEnum(STATUS)
    status? : STATUS;

}

export class TaskFilterDTO {
    @IsOptional()
    @IsNotEmpty()
    name? : string ;

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


