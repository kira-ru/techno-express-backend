import {
    DeviceDTO, DeviceModel
} from '@/controllers/device/device.types.ts';
import {Create, Get, GetAll} from '@/controllers/interfaces';
import {Device, DeviceInfo} from '@/models/db';
import {BaseErrorService} from '@/service/base-error.service.ts';
import {Response, Request, NextFunction} from 'express';
import {resolve} from "path";
import {v4 as uuidv4} from 'uuid';
import {Model} from "sequelize";

export class DeviceController implements Create, GetAll, Get {
    async create(req: Request, res: Response, next: NextFunction): Promise<Response<DeviceDTO>> {
        try {
            const {
                name,
                price,
                BrandId,
                DeviceTypeId,
            } = req.body as DeviceModel;
            const {img} = req.files;
            const imageFileName = uuidv4() + ".jpg";
            Array.isArray(img)
                ? await img[0].mv(resolve(__dirname, '../..', 'static', imageFileName))
                : await img.mv(resolve(__dirname, '../..', 'static', imageFileName));

            const device = await Device.create({
                name,
                price,
                BrandId: BrandId,
                DeviceTypeId: DeviceTypeId,
                img: imageFileName
            }) as Model<DeviceDTO>;

            //todo info logic
            // if (info) return res.json(device);
            // const allInfo: DeviceInformation[] = JSON.parse(info);
            // allInfo.forEach(info => {
            //   DeviceInfo.create({
            //     title: info.title,
            //     description: info.description,
            //     deviceId: device.dataValues.id,
            //   });
            // });
            return res.json(device);
        } catch (e) {
            next(BaseErrorService.internal(e.message));
        }
    }

    async getAll(req: Request, res: Response): Promise<Response<DeviceDTO[]>> {
        const {
            brandId,
            deviceTypeId,
            limit: limitQuery,
            page: pageQuery
        } = req.query;
        const limit = limitQuery ? +limitQuery : 10;
        const page = pageQuery ? +pageQuery : 1;
        const offset = (limit * page) - limit;
        let devices: Model<DeviceModel>[] = [];

        if (!brandId && !deviceTypeId) {
            devices = await Device.findAll({
                limit,
                offset
            });
        } else if (!brandId && deviceTypeId) {
            devices = await Device.findAll({
                limit,
                offset,
                where: {DeviceTypeId: +deviceTypeId}
            });
        } else if (brandId && !deviceTypeId) {
            devices = await Device.findAll({
                limit,
                offset,
                where: {BrandId: +brandId}
            });
        } else if (brandId && deviceTypeId) {
            devices = await Device.findAll({
                limit,
                offset,
                where: {
                    DeviceTypeId: +deviceTypeId,
                    BrandId: +brandId
                }
            });
        }

        return res.json(devices.map(device => new DeviceDTO(device.dataValues)));
    }

    async get(req: Request, res: Response<DeviceDTO>, next: NextFunction): Promise<unknown> {
        const {id} = req.params;
        if (!id) next(BaseErrorService.badRequest('device id is missing'));
        const device: Model<DeviceModel> = await Device.findOne({
            where: {id},
            include: [
                {
                    model: DeviceInfo,
                    as: 'info'
                }
            ]
        });
        return res.json(new DeviceDTO(device.dataValues));
    }
}

export default new DeviceController();
