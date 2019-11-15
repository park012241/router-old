import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { MongoDBModule } from './mongodb/mongodb.module';
import { SshModule } from './ssh/ssh.module';

@Module({
  imports: [ConfigModule, MongoDBModule, SshModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
