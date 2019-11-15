import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { SshService } from './ssh.service';

@Module({
  exports: [SshService],
  imports: [ConfigModule],
  providers: [SshService]
})
export class SshModule {
}
