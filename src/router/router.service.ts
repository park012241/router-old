import { Inject, Injectable } from '@nestjs/common';
import { ConfigProvider } from '../config/config.provider';
import { ExecResult, SshService } from '../ssh/ssh.service';

@Injectable()
export class RouterService {
  @Inject()
  private readonly sshService: SshService;
  @Inject()
  private readonly config: ConfigProvider;

  public iptables(): Promise<ExecResult> {
    return this.sshService.execute(this.sudo('iptables -L'));
  }

  private sudo(command: string): string {
    return `${this.config.ssh.username !== 'root' ? '' : 'sudo '}${command}`;
  }
}
