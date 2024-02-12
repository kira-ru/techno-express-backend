import DeviceController from '@/controllers/device.controller.ts'
import {Router} from 'express'

export const DeviceRouter = Router();
DeviceRouter.get('/', DeviceController.getAll);
DeviceRouter.post('/', DeviceController.create);

