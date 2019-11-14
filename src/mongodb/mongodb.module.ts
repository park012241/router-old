import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { MongoDBProvider } from './mongodb.provider';

@Module({
  exports: [MongoDBProvider],
  imports: [ConfigModule],
  providers: [MongoDBProvider]
})
export class MongoDBModule {
}
