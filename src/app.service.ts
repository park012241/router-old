import { Inject, Injectable } from '@nestjs/common';
import { RouterService } from './router/router.service';
import { SshService } from './ssh/ssh.service';

@Injectable()
export class AppService {
  @Inject()
  private readonly sshService: SshService;
  @Inject()
  private readonly routerService: RouterService;

  public async getHello(): Promise<string> {
    return ((await this.sshService.execute('echo "Hello World!"')).stdout || Buffer.from('SSH Error')).toString();
  }

  public async iptables(): Promise<string> {
    return (await this.routerService.iptables()).stdout.toString();
  }
}
