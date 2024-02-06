import {AuthRouter} from '@/routes/auth.ts'
import {BrandRouter} from '@/routes/brand.ts'
import {DeviceRouter} from '@/routes/device.ts'
import {DeviceTypeRouter} from '@/routes/device-type.ts'
import {Router} from 'express'

enum Routes {
  USER= "/user",
  TYPE = "/type",
  BRAND = "/brand",
  DEVICE = "/device"
}

export const routes = Router();

routes.use(Routes.USER, AuthRouter)
routes.use(Routes.TYPE, DeviceTypeRouter)
routes.use(Routes.BRAND, BrandRouter)
routes.use(Routes.DEVICE, DeviceRouter)

