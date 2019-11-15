import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { MongoDBModule } from './mongodb/mongodb.module';
import { RouterModule } from './router/router.module';
import { SshModule } from './ssh/ssh.module';

@Module({
  imports: [ConfigModule, MongoDBModule, SshModule, RouterModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
