import { Router } from 'express';
import { UserController } from '../controller';

export class UserRoutes {
  static get routes(): Router {
    const router = Router();
    const userController = new UserController();

    router.get(
      '/',
      userController.getAllUsers.bind(userController)
    )
    router.get(
      '/:id',
      userController.getUser.bind(userController)
    )

    router.post(
      '/login',
      userController.login.bind(userController)
    )

    return router;
  }
}