import {DeviceDTO, RequestWithFiles, DeviceInformation} from '@/controllers/device/device.types.ts';
import {Create, Get, GetAll} from '@/controllers/interfaces';
import {Device, DeviceInfo} from '@/models/db';
import {BaseErrorService} from '@/service/base-error.service.ts';
import {Response, Request, NextFunction} from 'express';
import {resolve} from "path";
import {v4 as uuidv4} from 'uuid';

export class DeviceController implements Create, GetAll, Get {
  async create(req: RequestWithFiles, res: Response, next: NextFunction): Promise<Response<DeviceDTO>> {
    try {
      const {
        name,
        price,
        brandId,
        deviceTypeId,
        info
      } = req.body as DeviceDTO;
      // @ts-expect-error img
      const { img } = req.files;
      const imageFileName = uuidv4() + ".jpg";
      img.mv(resolve(__dirname, '..', 'static', imageFileName));

      const device = await Device.create({
        name,
        price,
        BrandId: brandId,
        DeviceTypeId: deviceTypeId,
        img: imageFileName
      });

      if (info) return res.json(device);
      const allInfo: DeviceInformation[] = JSON.parse(info);
      allInfo.forEach(({
                         title,
                         description,
                         deviceId
                       }) => {
        DeviceInfo.create({
          title,
          description,
          deviceId
        });
      });
      return res.json(device);
    } catch (e) {
      next(BaseErrorService.internal(e.message));
    }
  }

  async getAll(req: Request, res: Response): Promise<Response<typeof Device[]>> {
    const {
      brandId,
      deviceTypeId,
      limit: limitQuery,
      page: pageQuery
    } = req.query;
    const limit = limitQuery ? +limitQuery : 10;
    const page = pageQuery ? +pageQuery : 1;
    const offset = (limit * page) - limit;
    if (!brandId && !deviceTypeId) {
      return res.json(await Device.findAll({
        limit,
        offset
      }));
    }
    if (!brandId && deviceTypeId) {
      return res.json(await Device.findAll({
        limit,
        offset,
        where: { DeviceTypeId: deviceTypeId }
      }));
    }
    if (brandId && !deviceTypeId) {
      return res.json(await Device.findAll({
        limit,
        offset,
        where: { BrandId: brandId }
      }));
    }
    if (brandId && deviceTypeId) {
      return res.json(await Device.findAll({
        limit,
        offset,
        where: {
          DeviceTypeId: deviceTypeId,
          BrandId: brandId
        }
      }));
    }
  }

  async get(req: Request, res: Response<unknown>, next: NextFunction): Promise<unknown> {
    const { id } = req.params;
    if (!id) next(BaseErrorService.badRequest('device id is missing'));
    return res.json(await Device.findOne({
      where: { id },
      include: [
        {
          model: DeviceInfo,
          as: 'info'
        }
      ]
    }));
  }
}

export default new DeviceController();
