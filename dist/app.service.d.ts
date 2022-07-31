import { HttpService } from '@nestjs/axios';
import { Request, Response } from 'express';
export declare class AppService {
    private readonly httpService;
    constructor(httpService: HttpService);
    bff(req: Request, res: Response): Promise<any>;
}
