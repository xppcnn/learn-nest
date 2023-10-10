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
    console.log("🚀 ~ file: permission.guard.ts:25 ~ PermissionGuard ~ canActivate ~ req:", req)
    const curUser = req.user;
    console.log("🚀 ~ file: permission.guard.ts:26 ~ PermissionGuard ~ canActivate ~ curUser:", curUser)
    if (!curUser) {
      throw new UnauthorizedException('用户未登录');
    }
    let permissions = await this.redisService.listGet(
      `user_${curUser.id}_permissions`,
    );
    if (permissions.length === 0) {
      const userVo = await this.userService.findByUserName(curUser.username);
      permissions = userVo.permissions.map((item) => item.name);
      this.redisService.listSet(
        `user_${curUser.id}_permissions`,
        permissions,
        60 * 30,
      );
    }

    const permission = this.reflector.get('permission', context.getHandler());
    console.log(permission, permissions);
    if (permissions.some((item) => item === permission)) {
      return true;
    } else {
      throw new UnauthorizedException('没有访问权限');
    }
  }
}
