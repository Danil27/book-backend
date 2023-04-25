import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Role } from '@prisma/client';

@Injectable()
export class IsAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    return request.user.role === Role.ADMIN;
  }
}
