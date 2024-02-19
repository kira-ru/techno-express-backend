import {BrandRouter} from '@/routes/brand.ts';
import {DeviceTypeRouter} from '@/routes/device-type.ts';
import {DeviceRouter} from '@/routes/device.ts';
import {UserRouter} from '@/routes/user.ts';
import {Router} from 'express';

enum Routes {
  USER = "/user",
  DEVICE_TYPE = "/device-type",
  BRAND = "/brand",
  DEVICE = "/device"
}

export const routes = Router();

routes.use(Routes.USER, UserRouter);
routes.use(Routes.DEVICE_TYPE, DeviceTypeRouter);
routes.use(Routes.BRAND, BrandRouter);
routes.use(Routes.DEVICE, DeviceRouter);

