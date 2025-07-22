import {
    Controller,
    Get, Post, Body, Param, Delete, Put, Patch, Query, HttpCode,
    HttpStatus,
    Req,
    UnauthorizedException
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskDTO, TaskFilterDTO, TaskUpdateDTO } from './tasks.model';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { User } from 'src/generated/client';


@Controller('tasks')
export class TasksController {

    constructor(private Taskservice: TasksService) { }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getallTasks(@Query() TaskQuery: TaskFilterDTO, @Req() req: Request): Promise<Task[]> {
        if (!req.user) throw new UnauthorizedException()
        return await this.Taskservice.Getalltasks(TaskQuery, req.user as User)
    }
    @UseGuards(AuthGuard('jwt'))
    @Get('/:id/')
    async getTaskbyId(@Param('id') id: string, @Req() req: Request): Promise<Task> {
        if (!req.user) throw new UnauthorizedException()
        return await this.Taskservice.GetTaskbyId(id, req.user as User)
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async CreateTask(@Body() TaskObj: TaskDTO, @Req() req: Request): Promise<Task> {
        if (!req.user) throw new UnauthorizedException()
        return await this.Taskservice.CreateTasks(TaskObj, req.user as User)
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('/:id/')
    @HttpCode(HttpStatus.NO_CONTENT)
    async DeleteTaskbyid(@Param('id') id: string, @Req() req: Request): Promise<void> {
        return await this.Taskservice.DeleteTaskbyId(id, req.user as User)
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch('/:id/')
    async UpdateTaskbyId(@Param('id') id: string, @Body() TaskUpdateObj: TaskUpdateDTO, @Req() req: Request): Promise<Task> {
        return await this.Taskservice.UpdateTaskbyId(TaskUpdateObj, id, req.user as User)
    }



}
