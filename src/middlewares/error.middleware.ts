import {BaseErrorService} from '@/errors/base-error.service.ts'
import {Request, Response} from 'express'

export default function (err: Error | BaseErrorService, req: Request, res: Response): Response<unknown, Record<string, unknown>> {
  if (err instanceof BaseErrorService) {
    return res.status(Number(err.status)).json({message: err.message})
  }
  return res.status(500).json({message: "Непредвиденная ошибка"})
}
