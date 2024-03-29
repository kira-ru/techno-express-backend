import {DeviceDTO, DeviceModel} from '@/controllers/device/device.types';
import {Create, Get, GetAll} from '@/controllers/interfaces';
import {BaseErrorService} from '@/service/base-error.service';
import DeviceService, {DeviceFilter} from '@/service/device.service';
import {NextFunction, Request, Response} from 'express';

export class DeviceController implements Create, GetAll, Get {
  async create(req: Request, res: Response, next: NextFunction): Promise<Response<DeviceDTO> | void> {
    const device = await DeviceService.create((req.body as DeviceModel), req.files.img);
    if (!device) return next(BaseErrorService.internal('Невозможно создать обьект, попробуйте позже...'));
    return res.json(new DeviceDTO(device.dataValues));
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<Response<DeviceDTO[]> | void> {
    const devices =  await DeviceService.getAll(req.query as unknown as DeviceFilter );
    //todo явно определять ошибку
    if (!devices) return next(BaseErrorService.internal('Ошибка сервера или неправельное значние фильтра'));
    return res.json(devices.map(device => new DeviceDTO(device.dataValues)));
  }

  async get(req: Request, res: Response<DeviceDTO>, next: NextFunction): Promise<unknown> {
    const { id } = req.params;
    if (!id || isNaN(+id)) return next(BaseErrorService.badRequest('Неверно указан id'));
    const device = await DeviceService.getDevice(+id);
    if (!device) return next(BaseErrorService.internal(`Девайса с id=${id} не существует`));
    return res.json(new DeviceDTO(device.dataValues));
  }
}

export default new DeviceController();
