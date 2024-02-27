export type DeviceModel = {
  id: number,
  name: string,
  price: string,
  BrandId: number,
  DeviceTypeId: number,
  rating: number,
  info: string,
  img: string,
  updateAt: Date,
  createAt: Date,
}

export class DeviceDTO {
  id: number;
  name: string;
  price: string;
  BrandId: number;
  DeviceTypeId: number;
  rating: number;
  info: string;
  img: string;

  constructor(device: DeviceModel) {
    this.id = device.id;
    this.name = device.name;
    this.price = device.price;
    this.BrandId = device.BrandId;
    this.DeviceTypeId = device.DeviceTypeId;
    this.rating = device.rating;
    this.info = device.info;
    this.img = device.img;
  }
}

export type DeviceInformationModel = {
  id: number,
  title: string,
  description: string,
  DeviceId: string,
  createdAt: Date,
  updatedAt: Date,
}

export type DeviceInformation = Omit<DeviceInformationModel, "DeviceId" | "createAt" | "updateAt">


