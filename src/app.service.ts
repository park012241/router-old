import { Injectable } from '@nestjs/common';
import { SshService } from './ssh/ssh.service';

@Injectable()
export class AppService {
  constructor(private readonly sshService: SshService) {
  }

  async getHello(): Promise<string> {
    return (await this.sshService.execute('echo "Hello World!"')).stdout.toString();
  }
}
