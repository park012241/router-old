import { Injectable } from '@nestjs/common';
import { Client, ConnectConfig } from 'ssh2';
import { ConfigProvider } from '../config/config.provider';

export interface ExecResult {
  stdout?: Buffer;
  stderr?: Buffer;

  signal: number;
  exitCode: number;
}

@Injectable()
export class SshService {
  private client: Client;
  private sshConfig: ConnectConfig = {};

  private newLine = Buffer.from('\n');

  constructor(private readonly config: ConfigProvider) {
    this.client = new Client();
    Object.assign(this.sshConfig, config.ssh);
  }

  public execute(command: string): Promise<ExecResult> {
    return new Promise((resolve, reject) => {
      this.client.on('ready', () => {
        this.client.exec(command, (err, stream) => {
          const result: ExecResult = {
            signal: 0,
            exitCode: 0,
            stdout: Buffer.from([]),
            stderr: Buffer.from([])
          };

          if (err) {
            reject(err);
          }
          stream.on('close', (code, signal) => {
            result.exitCode = code;
            result.signal = signal;
            resolve(result);
          }).on('data', (data) => {
            result.stdout = Buffer.concat([result.stdout, this.newLine, data]);
          }).stderr.on('data', (data) => {
            result.stderr = Buffer.concat([result.stderr, this.newLine, data]);
          });
        });
      }).connect(this.sshConfig);
    });
  }
}
