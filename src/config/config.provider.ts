import { Injectable } from '@nestjs/common';
import { IsBoolean, IsOptional, IsString, validateOrReject, ValidationError } from 'class-validator';
import { config } from 'dotenv';

@Injectable()
export class ConfigProvider {
  @IsString()
  public readonly mongodbURI: string;

  @IsBoolean()
  public readonly isProduction: boolean;

  @IsOptional()
  @IsString()
  public readonly elasticSearchAPM?: string;

  constructor() {
    config();

    this.mongodbURI = process.env.MONGODB_URI;
    this.isProduction = process.env.NODE_ENV === 'production';
    this.elasticSearchAPM = process.env.ES_APM;

    validateOrReject(this, {
      validationError: {
        target: false
      }
    }).then(() => {
      console.debug('Config Applied');
    }).catch((e: ValidationError[]) => {
      throw e;
    });
  }
}
