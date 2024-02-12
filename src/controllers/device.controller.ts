import {Create} from '@/controllers/interfaces'
import {Device} from '@/models/db'
import {Response, Request} from 'express'
import {resolve} from "path"
import { v4 as uuidv4 } from 'uuid';

type RequestWithFiles = Request & {files: string};

export class DeviceController implements Create {
  async create(req: RequestWithFiles, res: Response): Promise<void> {
    const {name, price, brandId, deviceTypeId} = req.body;
    // @ts-expect-error тип файла неизвестен
    const { deviceImage } = req.files;
    const uniqImageName = uuidv4() + ".jpg";
    deviceImage.mv(resolve(__dirname, '..', 'static', uniqImageName));

    const device = await Device.create({
      name, price, brandId, deviceTypeId, img: uniqImageName
    });

    res.json(device);
  }

}
