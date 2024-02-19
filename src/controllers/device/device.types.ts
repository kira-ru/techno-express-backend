import {Request} from 'express';

export type RequestWithFiles = Request & { files: string };

export type DeviceDTO = {
  id: number,
  name: string,
  price: string,
  brandId: number,
  deviceTypeId: number,
  rating: number,
  info: string,
  img: string,
  updateAt: Date,
  createAt: Date,
}

export type DeviceI = Omit<DeviceDTO, "createAt" | "updateAt" | "id" >

export type DeviceInformationDTO = {
  title: string,
  description: string,
  deviceId: string,
}

export type DeviceInformation = Omit<DeviceInformationDTO, 'deviceId'>

