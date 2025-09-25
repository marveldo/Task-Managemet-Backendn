import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { LoggingInterceptor } from './logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    methods : ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    origin : [
      'http://localhost:5173',
      process.env.CORS_FRONTEND_URL
    ]
  })
  const config = new DocumentBuilder()
        .setTitle('Task Management application')
        .setDescription('A Task Management Application')
        .setVersion('1.0')
        .build()
  const documentFactory = () => SwaggerModule.createDocument(app , config)
  SwaggerModule.setup('docs', app , documentFactory)
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalInterceptors(new LoggingInterceptor())
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
