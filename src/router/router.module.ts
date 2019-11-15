import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { SshModule } from '../ssh/ssh.module';
import { RouterService } from './router.service';

@Module({
  imports: [SshModule, ConfigModule],
  exports: [RouterService],
  providers: [RouterService]
})
export class RouterModule {
}
