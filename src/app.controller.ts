import { Controller, All, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';

@Controller('*')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @All()
  async bff(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return await this.appService.bff(req, res);
  }
}
