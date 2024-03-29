import {Create, GetAll} from '@/controllers/interfaces';
import {DeviceType} from '@/models/db';
import {BaseErrorService} from '@/service/base-error.service';
import {NextFunction, Request, Response} from "express";

class DeviceTypeController implements Create, GetAll {
  async getAll(req: Request, res: Response): Promise<void> {
    const allDeviceTypes = await DeviceType.findAll();
    res.json(allDeviceTypes);
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    if (!("name" in req.body)) return next(BaseErrorService.badRequest('Отсутствует поле name'));
    const deviceType = await DeviceType.create(req.body);
    res.json(deviceType);
  }
}

export default new DeviceTypeController();
