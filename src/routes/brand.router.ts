import BrandController from '@/controllers/brand.controller';
import {Router} from 'express';

export const BrandRouter = Router();
BrandRouter.get('/', BrandController.getAll);
BrandRouter.post('/', BrandController.create);
