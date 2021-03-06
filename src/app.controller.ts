import { Controller, Get, Header } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  public getHello(): Promise<string> {
    return this.appService.getHello();
  }

  @Get('iptables')
  @Header('content-type', 'text/plain')
  public iptables(): Promise<string> {
    return this.appService.iptables();
  }
}
