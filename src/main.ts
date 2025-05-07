import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaClientExceptionFilter } from '@app/database';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalFilters(new PrismaClientExceptionFilter());

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
