import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  @Inject(Reflector)
  private reflector: Reflector;

  @Inject(RedisService)
  private redisService: RedisService;

  @Inject(UserService)
  private userService: UserService;
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const curUser = req.user;
    if (!curUser) {
      return true;
    }
    const permissionVo = await this.userService.findPermissionByUserId(
      curUser.id,
    );
    const requirePermission = this.reflector.getAllAndOverride(
      'require-permission',
      [context.getClass(), context.getHandler()],
    );

    for (let i = 0; i < requirePermission.length; i++) {
      const curPer = requirePermission[i];
      const funder = permissionVo.find((ele) => ele.name === curPer);
      if (!funder) {
        throw new UnauthorizedException('您没有访问该接口的权限');
      }
    }
    return true;
  }
}
