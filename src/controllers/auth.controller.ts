import {Controller} from '@/controllers/interfaces'
import {BaseErrorService} from '@/service/base-error.service.ts'

export class AuthController {
  public static authentication: Controller = (req, res, next) => {
    const {id} = req.query;
    if(!id) return next(BaseErrorService.badRequest('Не задан ID'));
    res.json(id);
  }
}
