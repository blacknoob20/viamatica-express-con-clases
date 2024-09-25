import { Request, Response } from 'express';
import { UserService } from '../services/user.services';
import { UserLoginInterface } from '../interfaces/user.interface';
import { serviceResponse, wrapperError } from '@/shared/helpers';

export class UserController {
  async getUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userService = new UserService();
      const response = await userService.getUser(Number(id));

      serviceResponse({ req, res, data: response });
    } catch (error: any) {
      wrapperError({ req, res, })
    }
  }
  async getAllUsers(req: Request, res: Response) {
    try {
      const userService = new UserService();
      const response = await userService.getAllUsers();

      serviceResponse({ req, res, data: response });
    } catch (error: any) {
      wrapperError({ req, res, })
    }
  }

  login(req: Request, res: Response) {
    try {
      const body = req.body as UserLoginInterface;
      const userService = new UserService();
      const response = userService.login(body);

      serviceResponse({
        req,
        res,
        data: response
      });
    } catch (error: any) {
      wrapperError({
        req,
        res,
      })
    }
  }

}