import DeviceTypeController from '@/controllers/device-type.controller.ts';
import {Router} from 'express';

export const DeviceTypeRouter = Router();
DeviceTypeRouter.get('/', DeviceTypeController.getAll);
DeviceTypeRouter.post('/', DeviceTypeController.create);
