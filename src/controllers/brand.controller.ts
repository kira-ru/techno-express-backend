import {Create, GetAll} from '@/controllers/interfaces';
import {Brand} from '@/models/db';
import {BaseErrorService} from '@/service/base-error.service';
import {NextFunction, Request, Response} from "express";

class BrandController implements Create, GetAll {
  async getAll(req: Request, res: Response): Promise<void> {
    const allBrands = await Brand.findAll();
    res.json(allBrands);
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    if (!("name" in req.body)) return next(BaseErrorService.badRequest('Отсутствует поле name'));
    const brand = await Brand.create(req.body);
    res.json(brand);
  }
}

export default new BrandController();
