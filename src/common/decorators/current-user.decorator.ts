import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

type CurrentUserDecoratorParam = {
  requireUser: boolean;
};

export const CurrentUser = createParamDecorator(
  (
    data: CurrentUserDecoratorParam = { requireUser: true },
    ctx: ExecutionContext,
  ) => {
    const request = ctx.switchToHttp().getRequest();
    if (!request.user && data.requireUser) {
      throw new BadRequestException();
    }
    return request.user;
  },
);
