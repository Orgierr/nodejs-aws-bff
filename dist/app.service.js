"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
let AppService = class AppService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async bff(req, res) {
        const recipient = req.originalUrl.split('/')[1];
        const recipientURL = process.env[recipient];
        if (!recipientURL)
            throw new common_1.BadGatewayException('Cannot process request');
        const axiosConfig = Object.assign(Object.assign({ url: `${recipientURL}${req.originalUrl}`, method: req.method }, (Object.keys(req.body || {}).length > 0 && { data: req.body })), (req.headers.authorization
            ? {
                headers: req.headers.authorization
                    ? { Authorization: req.headers.authorization }
                    : {},
            }
            : {}));
        try {
            const result = await this.httpService.axiosRef(axiosConfig);
            return result.data;
        }
        catch (error) {
            const err = error;
            if (err.response) {
                const { status, data } = err.response;
                return res.status(status).json(data);
            }
            throw new common_1.InternalServerErrorException(err.message);
        }
    }
};
AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map