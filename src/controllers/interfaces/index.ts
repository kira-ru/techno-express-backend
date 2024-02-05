import {NextFunction, Request, Response} from "express"

export type Controller = (req: Request, res: Response, next?: NextFunction) => void;
export interface Get {
  get: Controller
}

export interface GetAll{
  getAll: Controller
}

export interface Update {
  update: Controller
}

export interface Delete {
  delete: Controller
}
