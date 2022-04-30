import APIError from '../helpers/APIError';
import { MongoModel } from '../models';

abstract class BaseService<T> {
  private notFoundMessage = 'Object not found';

  constructor(protected model: MongoModel<T>) {}

  async create(data: T): Promise<T> {
    return this.model.create(data);
  }

  async read(): Promise<T[]> {
    return this.model.read();
  }

  async readOne(id: string): Promise<T | null> {
    const object = await this.model.readOne(id);
    if (!object) {
      throw new APIError(this.notFoundMessage, 'notFound');
    }

    return object;
  }

  async update(id: string, data: T): Promise<T | null> {
    const object = await this.model.readOne(id);
    if (!object) {
      throw new APIError(this.notFoundMessage, 'notFound');
    }

    return this.model.update(id, data);
  }

  async delete(id: string): Promise<T | null> {
    const object = await this.model.readOne(id);
    if (!object) {
      throw new APIError(this.notFoundMessage, 'notFound');
    }

    return this.model.delete(id);
  }
}

export default BaseService;
