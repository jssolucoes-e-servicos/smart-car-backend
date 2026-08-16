import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
    bufferLogs: true,
  });

  app.use(helmet());
  app.use(cookieParser());
  app.enableCors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-company-id', 'x-user-id'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove propriedades que não estão no DTO
      forbidNonWhitelisted: true, // Bloqueia requisições com campos extras maliciosos
      transform: true, // Transforma os payloads para instâncias das classes DTO
    }),
  );

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  const config = new DocumentBuilder()
    .setTitle('smartCar - by JS Soluções e Serviços')
    .setDescription(
      'This is a API for smartCar - by JS Soluções e Serviços',
    )
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' },
      'JWT',
    )
    .addApiKey(
      { type: 'http', in: 'header', name: 'x-company-id', description: 'ID da empresa' },
      'companyID',
    )
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory, {
    swaggerOptions: {
      persistAuthorization: true, // mantém o token entre reloads
    },
  });

  const port = process.env.PORT || 4000;

  if (process.env.NODE_ENV === 'development') {
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  await app.listen(port);
  console.log(`🚀 API smartCar rodando na porta ${port}`);
}
bootstrap();
