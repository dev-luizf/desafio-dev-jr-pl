import { Request, Response } from 'express';
import { BaseService } from '../services';

abstract class BaseController<T> {
  private invalidIdMessage = 'Id must have 24 hexadecimal characters';

  private idPattern = /[0-9A-Fa-f]{24}/;

  constructor(protected service: BaseService<T>) {}

  idIsValid(id: string) {
    return this.idPattern.test(id) && id.length === 24;
  }

  create = async (req: Request, res: Response) => {
    const result = await this.service.create(req.body);
    return res.status(201).json(result);
  };

  read = async (req: Request, res: Response) => {
    const result = await this.service.read();
    return res.status(200).json(result);
  };

  readOne = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (this.idIsValid(id)) {
      const result = await this.service.readOne(id);
      return res.status(200).json(result);
    }

    res.status(400).json({ error: this.invalidIdMessage });
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (this.idIsValid(id)) {
      const result = await this.service.update(id, req.body);
      return res.status(200).json(result);
    }

    res.status(400).json({ error: this.invalidIdMessage });
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (this.idIsValid(id)) {
      const result = await this.service.delete(id);
      return res.status(204).json(result);
    }

    res.status(400).json({ error: this.invalidIdMessage });
  };
}

export default BaseController;
