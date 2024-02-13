import {Create, GetAll} from '@/controllers/interfaces'
import {Device} from '@/models/db'
import {BaseErrorService} from '@/service/base-error.service.ts'
import {Response, Request, NextFunction} from 'express'
import {resolve} from "path"
import { v4 as uuidv4 } from 'uuid';

type RequestWithFiles = Request & {files: string};

export class DeviceController implements Create, GetAll {
  async create(req: RequestWithFiles, res: Response, next: NextFunction): Promise<void> {
    try {
      const {name, price, brandId, deviceTypeId} = req.body;
      // @ts-expect-error тип файла неизвестен
      const { img } = req.files;
      const imageFileName = uuidv4() + ".jpg";
      img.mv(resolve(__dirname, '..', 'static', imageFileName));

      const device = await Device.create({
        name, price, BrandId: brandId, DeviceTypeId: deviceTypeId, img: imageFileName
      });
      res.json(device);
    } catch (e) {
      next(BaseErrorService.internal(e.message))
    }
  }

  async getAll(req: Request, res: Response): Promise<Response<typeof Device[]>> {
    const {brandId, deviceTypeId, limit: limitQuery, page: pageQuery} = req.query;
    const limit = limitQuery ? +limitQuery : 10;
    const page = pageQuery ? +pageQuery : 1;
    const offset = (limit * page) - limit;
    if (!brandId && !deviceTypeId) return res.json(await Device.findAll({limit, offset}));
    if(!brandId && deviceTypeId) return res.json(await Device.findAll({limit, offset,where: { DeviceTypeId: deviceTypeId }}));
    if(brandId && !deviceTypeId) return res.json(await Device.findAll({limit, offset, where: { BrandId: brandId }}));
    if(brandId && deviceTypeId) return res.json(await Device.findAll({limit, offset, where: { DeviceTypeId: deviceTypeId, BrandId: brandId }}));
  }
}

export default new DeviceController();
