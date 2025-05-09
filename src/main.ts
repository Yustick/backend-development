import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaClientExceptionFilter } from '@app/database';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalFilters(new PrismaClientExceptionFilter());

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true, // видаляє поля, яких немає в DTO
            forbidNonWhitelisted: true, // помилка, якщо є зайві поля
            transform: true, // автоматичне перетворення типів
        })
    );

    app.use(cookieParser());

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
