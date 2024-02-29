import {DeviceDTO, DeviceModel} from '@/controllers/device/device.types.ts';
import {Device, DeviceInfo} from '@/models/db';
import {Nullable} from '@/types/helpers.ts';
import {UploadedFile} from 'express-fileupload';
import {resolve} from 'path';
import {Model} from 'sequelize';
import {v4 as uuidv4} from 'uuid';

export interface DeviceFilter {
  brandId: string,
  deviceTypeId: string,
  limit: string,
  page: string,
}

export type DBResponse<T> = Nullable<Model<T>>;

class DeviceService {
  public async create(device: Omit<DeviceDTO, 'id' | 'img'>, deviceImg: UploadedFile | UploadedFile[]): Promise<DBResponse<DeviceModel>> {
    try {
      const {
        name,
        price,
        BrandId,
        DeviceTypeId,
      } = device;
      const imageFileName = this.generateImgUniqName();
      void this.toStaticFolder(deviceImg, imageFileName);
      return await Device.create({
        name,
        price,
        BrandId,
        DeviceTypeId,
        img: imageFileName
      });
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  public async getAll(filter: DeviceFilter): Promise<DBResponse<DeviceModel>[]> {
    try {
      const {
        brandId: BrandId,
        deviceTypeId: DeviceTypeId,
        limit: limitQuery,
        page: pageQuery
      } = filter;
      const limit = limitQuery ? +limitQuery : 10;
      const page = pageQuery ? +pageQuery : 1;
      const offset = (limit * page) - limit;
      let devices: Model<DeviceModel>[] = [];

      if (!BrandId && !DeviceTypeId) {
        devices = await Device.findAll({
          limit,
          offset
        });
      } else if (!BrandId && DeviceTypeId) {
        devices = await Device.findAll({
          limit,
          offset,
          where: {DeviceTypeId: +DeviceTypeId}
        });
      } else if (BrandId && !DeviceTypeId) {
        devices = await Device.findAll({
          limit,
          offset,
          where: {BrandId: +BrandId}
        });
      } else if (BrandId && DeviceTypeId) {
        devices = await Device.findAll({
          limit,
          offset,
          where: {
            DeviceTypeId: +DeviceTypeId,
            BrandId: +BrandId
          }
        });
      }
      return devices;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  public async getDevice(id: number): Promise<DBResponse<DeviceModel>> {
    return await Device.findOne({
      where: { id },
      include: [
        {
          model: DeviceInfo,
          as: 'info'
        }
      ]
    });
  }

  private generateImgUniqName(): string {
    return uuidv4() + ".jpg";
  }

  private async toStaticFolder(img: UploadedFile | UploadedFile[], imgFileName: string): Promise<void> {
    Array.isArray(img)
    ? await img[0].mv(resolve(__dirname, '../', 'static', imgFileName))
    : await img.mv(resolve(__dirname, '../', 'static', imgFileName));
  }
}

export default new DeviceService();
