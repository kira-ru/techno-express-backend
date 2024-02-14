import {Request} from 'express';

export type RequestWithFiles = Request & { files: string };

export type DeviceDTO = {
  name: string,
  price: string,
  brandId: string,
  deviceTypeId: string,
  info: string,
}

export type DeviceInformation = {
  title: string,
  description: string,
  deviceId: string,
}
