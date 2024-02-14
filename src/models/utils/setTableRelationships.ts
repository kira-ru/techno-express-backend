import {Basket, BasketDevice, Brand, BrandType, Device, DeviceInfo, DeviceType, Rating, User} from '@/models/db';

export function setTableRelationships(): void {
  Device.hasMany(Rating);
  Rating.belongsTo(Device);

  Device.hasMany(DeviceInfo, {as: 'info'});
  DeviceInfo.belongsTo(Device);

  DeviceInfo.belongsTo(Device);
  Device.hasMany(DeviceInfo);

  User.hasOne(Basket);
  Basket.belongsTo(User);

  User.hasMany(Rating);
  Rating.belongsTo(User);

  Brand.hasMany(Device);
  Device.belongsTo(Brand);

  DeviceType.hasMany(Device);
  Device.belongsTo(DeviceType);

  Device.hasMany(BasketDevice);
  BasketDevice.belongsTo(Device);

  DeviceType.belongsToMany(Brand, {through: BrandType});
  Brand.belongsToMany(DeviceType, {through: BrandType});
}
