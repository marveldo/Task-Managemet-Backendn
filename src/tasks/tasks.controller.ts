import {
    Controller,
    Get, Post, Body, Param, Delete, Put, Patch, Query, HttpCode,
    HttpStatus,
    Req,
    UnauthorizedException
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskDTO, TaskFilterDTO, TaskUpdateDTO , Taskresponse, BadRequestResponse } from './tasks.model';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { User } from 'src/generated/client';
import { ApiResponse } from '@nestjs/swagger';


@Controller('tasks')
export class TasksController {

    constructor(private Taskservice: TasksService) { }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    @ApiResponse({
        status : HttpStatus.OK ,
        description : 'Response on getting user tasks',
        type : [Taskresponse],
    })
    @ApiResponse({
        status : HttpStatus.NOT_FOUND,
        description : 'Response on No tasks found',
        type : BadRequestResponse
    })
    async getallTasks(@Query() TaskQuery: TaskFilterDTO, @Req() req: Request): Promise<Task[]> {
        if (!req.user) throw new UnauthorizedException()
        return await this.Taskservice.Getalltasks(TaskQuery, req.user as User)
    }


    @UseGuards(AuthGuard('jwt'))
    @Get('/:id/')
    @ApiResponse({
        status : HttpStatus.OK ,
        description : 'Response on getting user task',
        type : Taskresponse,
    })
    @ApiResponse({
        status : HttpStatus.NOT_FOUND,
        description : 'Response on No tasks found',
        type : BadRequestResponse
    })
    async getTaskbyId(@Param('id') id: string, @Req() req: Request): Promise<Task> {
        if (!req.user) throw new UnauthorizedException()
        return await this.Taskservice.GetTaskbyId(id, req.user as User)
    }

    @ApiResponse({
        status : HttpStatus.CREATED,
        description : 'Response on User Creating New Task',
        type : Taskresponse,
    })
    @ApiResponse({
        status : HttpStatus.BAD_REQUEST,
        description : 'Response on Bad request Submitted',
        type : BadRequestResponse
    })
    @UseGuards(AuthGuard('jwt'))
    @Post()
    async CreateTask(@Body() TaskObj: TaskDTO, @Req() req: Request): Promise<Task> {
        if (!req.user) throw new UnauthorizedException()
        return await this.Taskservice.CreateTasks(TaskObj, req.user as User)
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('/:id/')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiResponse({
        status : HttpStatus.NO_CONTENT
    })
    @ApiResponse({
        status : HttpStatus.NOT_FOUND,
        description : 'Response on No tasks found',
        type : BadRequestResponse
    })
    async DeleteTaskbyid(@Param('id') id: string, @Req() req: Request): Promise<void> {
        return await this.Taskservice.DeleteTaskbyId(id, req.user as User)
    }

    
    @UseGuards(AuthGuard('jwt'))
    @Patch('/:id/')
    @ApiResponse({
        status : HttpStatus.OK,
        description : 'Updated Successfully',
        type : Taskresponse
    })
    @ApiResponse({
        status : HttpStatus.NOT_FOUND,
        description : 'Response on No tasks found',
        type : BadRequestResponse
    })
    @ApiResponse({
        status : HttpStatus.BAD_REQUEST,
        description : 'Response on Bad request Submitted',
        type : BadRequestResponse
    })
    async UpdateTaskbyId(@Param('id') id: string, @Body() TaskUpdateObj: TaskUpdateDTO, @Req() req: Request): Promise<Task> {
        return await this.Taskservice.UpdateTaskbyId(TaskUpdateObj, id, req.user as User)
    }



}
