import { Router } from 'express';
import { BaseController } from '../controllers';
import JoiValidator from '../middlewares/validator';

abstract class BaseRouter<T> {
  router = Router();

  constructor(
    protected controller: BaseController<T>,
    protected createValidator: JoiValidator,
    protected updateValidator: JoiValidator | undefined,
  ) {
    this.routes();
  }

  routes() {
    this.router.get('/', this.controller.read);
    this.router.post('/', this.createValidator.validateBody, this.controller.create);
    this.router.get('/:id', this.controller.readOne);

    if (this.updateValidator) {
      this.router.put('/:id', this.updateValidator.validateBody, this.controller.update);
    } else {
      this.router.put('/:id', this.createValidator.validateBody, this.controller.update);
    }

    this.router.delete('/:id', this.controller.delete);
  }
}

export default BaseRouter;
