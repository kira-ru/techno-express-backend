import DeviceController from '@/controllers/device/device.controller';
import {Router} from 'express';

export const DeviceRouter = Router();
DeviceRouter.get('/', DeviceController.getAll);
DeviceRouter.get('/:id', DeviceController.get);
DeviceRouter.post('/', DeviceController.create);

