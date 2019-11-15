import { Injectable } from '@nestjs/common';
import { IsBoolean, IsNumber, IsObject, IsOptional, IsString, validateOrReject, ValidationError } from 'class-validator';
import { config } from 'dotenv';
import { ConnectConfig } from 'ssh2';

@Injectable()
export class ConfigProvider {
  @IsString()
  public readonly mongodbURI: string;

  @IsBoolean()
  public readonly isProduction: boolean;

  @IsOptional()
  @IsString()
  public readonly elasticSearchAPM?: string;

  @IsNumber()
  public readonly port: number;

  @IsString()
  public readonly host: string;

  @IsOptional()
  @IsObject()
  public readonly ssh?: ConnectConfig;

  constructor() {
    config();

    this.mongodbURI = process.env.MONGODB_URI;
    this.isProduction = process.env.NODE_ENV === 'production';
    this.elasticSearchAPM = process.env.ES_APM;
    this.port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
    this.host = process.env.HOST || '0.0.0.0';
    this.ssh = process.env.SSH_HOST ? {
      host: process.env.SSH_HOST,
      username: process.env.SSH_USER,
      password: process.env.SSH_PASSWD
    } : undefined;

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
