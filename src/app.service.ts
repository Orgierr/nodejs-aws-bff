import { HttpService } from '@nestjs/axios';
import {
  BadGatewayException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AxiosRequestConfig, AxiosError } from 'axios';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}
  async bff(req: Request, res: Response) {
    const recipient = req.originalUrl.split('/')[1];

    const recipientURL = process.env[recipient];
    if (!recipientURL) throw new BadGatewayException('Cannot process request');
    const axiosConfig: AxiosRequestConfig = {
      url: `${recipientURL}${req.originalUrl}`,
      method: req.method,
      ...(Object.keys(req.body || {}).length > 0 && { data: req.body }),
      ...(req.headers.authorization
        ? {
            headers: req.headers.authorization
              ? { Authorization: req.headers.authorization }
              : {},
          }
        : {}),
    };

    try {
      const result = await this.httpService.axiosRef(axiosConfig);
      return result.data;
    } catch (error) {
      const err = error as AxiosError;
      if (err.response) {
        const { status, data } = err.response;
        return res.status(status).json(data);
      }
      throw new InternalServerErrorException(err.message);
    }
  }
}
