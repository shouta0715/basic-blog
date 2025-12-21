export const errors = {
  400: { message: "Bad Request" },
  401: { message: "Unauthorized" },
  403: { message: "Forbidden" },
  404: { message: "Not Found" },
  429: { message: "Too Many Requests" },
  500: { message: "Internal Server Error" },
} as const;

export type ErrorStatus = keyof typeof errors;
export type ErrorMessage = (typeof errors)[ErrorStatus]["message"];

export type ApiErrorInfo = {
  status: ErrorStatus;
  message: string;
};

export class HttpError extends Error {
  readonly status: ErrorStatus;

  constructor(status: ErrorStatus, message?: string | null) {
    const defaultMessage = errors[status].message;
    super(message || defaultMessage);
    this.status = status;
    this.name = this.constructor.name;
  }

  toJSON(): ApiErrorInfo {
    return {
      status: this.status,
      message: this.message,
    };
  }
}

export class BadRequestError extends HttpError {
  constructor(message?: string) {
    super(400, message);
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message?: string) {
    super(401, message);
  }
}

export class ForbiddenError extends HttpError {
  constructor(message?: string) {
    super(403, message);
  }
}

export class NotFoundError extends HttpError {
  constructor(message?: string) {
    super(404, message);
  }
}

export class TooManyRequestsError extends HttpError {
  constructor(message?: string) {
    super(429, message);
  }
}

export class InternalServerError extends HttpError {
  constructor(message?: string) {
    super(500, message);
  }
}

const errorClasses = {
  400: BadRequestError,
  401: UnauthorizedError,
  403: ForbiddenError,
  404: NotFoundError,
  429: TooManyRequestsError,
  500: InternalServerError,
} as const;

export const getErrorStatus = (status: number): ErrorStatus =>
  status in errors ? (status as ErrorStatus) : 500;

export const createHttpError = (
  status: number,
  message?: string,
): HttpError => {
  const errorStatus = getErrorStatus(status);
  const ErrorClass = errorClasses[errorStatus];

  return new ErrorClass(message);
};

export const handleApiError = (error: unknown): ApiErrorInfo => {
  if (error instanceof HttpError) {
    return error.toJSON();
  }

  return {
    status: 500,
    message: errors[500].message,
  };
};
