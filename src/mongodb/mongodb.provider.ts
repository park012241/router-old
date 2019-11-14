import { Injectable } from '@nestjs/common';
import { FactoryProvider } from '@nestjs/common/interfaces';
import { Db, MongoClient } from 'mongodb';
import { ConfigProvider } from '../config/config.provider';

@Injectable()
export class MongoDBProvider implements FactoryProvider<Promise<Db>> {
  public provide = Db;
  public inject = [ConfigProvider];

  public async useFactory(config: ConfigProvider): Promise<Db> {
    return (await new MongoClient(config.mongodbURI, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    }).connect()).db();
  }
}
