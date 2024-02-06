import {Create} from '@/controllers/interfaces'
import {DeviceType} from '@/models/db'
import {BaseErrorService} from '@/service/base-error.service.ts'
import {NextFunction, Request, Response} from "express"

class DeviceTypeController implements Create {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    if (!("name" in req.body)) return next(BaseErrorService.badRequest('Отсутствует поле name'))
    const deviceType = await DeviceType.create(req.body);
    res.json(deviceType);
  }
}

export default new DeviceTypeController();
