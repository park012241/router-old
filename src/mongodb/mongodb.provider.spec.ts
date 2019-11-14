import { Test, TestingModule } from '@nestjs/testing';
import { MongoDBProvider } from './mongodb.provider';

describe('Mongodb', () => {
  let provider: MongoDBProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MongoDBProvider]
    }).compile();

    provider = module.get<MongoDBProvider>(MongoDBProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
