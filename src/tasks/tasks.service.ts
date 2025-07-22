import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskDTO, STATUS, TaskUpdateDTO, TaskFilterDTO } from './tasks.model';
import { v4 as uuid } from "uuid"
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/generated/client';
@Injectable()
export class TasksService {
  private readonly prisma: ReturnType<PrismaService['extendPrismaClient']>

  constructor(private prismaservice: PrismaService) {
    this.prisma = prismaservice.extendPrismaClient()
  }

  async Getalltasks(Taskquery: TaskFilterDTO, user: User) {

    let tasks: Task[] = await this.prisma.task.findMany({
      where: {
        user: user
      }
    }) as Task[]

    if (Object.keys(Taskquery).length) {
      if (Taskquery.status) {
        tasks = await this.prisma.task.findMany({
          where: {
            status: Taskquery.status,
            user: user
          }
        }) as Task[]
      }

      if (Taskquery.name) {
        tasks = await this.prisma.task.findMany({
          where: {
            name: Taskquery.name,
            description: Taskquery.name,
            user: user
          }
        }) as Task[]
      }
    }
    return tasks
  }

  async CreateTasks(Taskbody: TaskDTO, user: User): Promise<Task> {
    const { name, description } = Taskbody
    const taskobj = {
      name: name,
      description: description,
      status: STATUS.OPEN,
      user_id: user.id
    }
    const task: Task = await this.prisma.task.create({ data: taskobj }) as Task
    return task
  }

  async GetTaskbyId(id: string, user?: User): Promise<Task> {
    let task: Task
    const query = user ? { id: id, user_id: user.id } : { id: id }
    task = await this.prisma.task.findUnique({
      where: query
    }) as Task

    if (!task) {
      throw new NotFoundException()
    }
    return task
  }

  async DeleteTaskbyId(id: string, user: User): Promise<void> {

    const task: Task = await this.GetTaskbyId(id)
    if (task.user_id !== user.id) throw new ForbiddenException()
    await this.prisma.task.delete({
      where: {
        id: id
      }
    })
    return
  }

  async UpdateTaskbyId(TaskBody: TaskUpdateDTO, id: string, user: User): Promise<Task> {
    const task = await this.GetTaskbyId(id)
    if (task.user_id !== user.id) throw new ForbiddenException()
    const UpdatedTask = await this.prisma.task.update({
      where: {
        id: id
      },
      data: TaskBody
    }) as Task
    return UpdatedTask
  }
}
