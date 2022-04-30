type HttpCode = 'alreadyExists' | 'notFound' | 'badRequest' |
'unauthorized' | 'serverError';

class APIError extends Error {
  code: HttpCode;

  constructor(message: string, code: HttpCode) {
    super(message);
    this.code = code;
  }
}

export default APIError;
