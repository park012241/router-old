import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigProvider } from './config/config.provider';

const config = new ConfigProvider();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(config.port, config.host);
}

bootstrap().then();
