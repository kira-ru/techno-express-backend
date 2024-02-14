import {BrandRouter} from '@/routes/brand.ts';
import {DeviceTypeRouter} from '@/routes/device-type.ts';
import {DeviceRouter} from '@/routes/device.ts';
import {UserRouter} from '@/routes/user.ts';
import {Router} from 'express';

enum Routes {
  USER = "/user",
  TYPE = "/type",
  BRAND = "/brand",
  DEVICE = "/device"
}

export const routes = Router();

routes.use(Routes.USER, UserRouter);
routes.use(Routes.TYPE, DeviceTypeRouter);
routes.use(Routes.BRAND, BrandRouter);
routes.use(Routes.DEVICE, DeviceRouter);

