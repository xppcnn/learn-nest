import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AaaModule } from './aaa/aaa.module';
import { XxxModule } from './xxx/xxx.module';
import { YyyModule } from './yyy/yyy.module';
import { ZzzModule } from './zzz/zzz.module';
import { FilesUploadModule } from './files-upload/files-upload.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { Permission } from './user/entities/permission.entity';
import { RedisModule } from './redis/redis.module';
import { Role } from './user/entities/role.entity';
import { APP_GUARD } from '@nestjs/core';
import { LoginGuard } from './login.guard';
import { PermissionGuard } from './user/permission.guard';

@Module({
  imports: [
    AaaModule,
    XxxModule.register({
      aaa: 11,
      bbb: '222',
    }),
    ZzzModule,
    YyyModule,
    FilesUploadModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'host',
      port: 13306,
      username: 'root',
      password: 'password',
      database: 'rbac_test',
      synchronize: true,
      logging: true,
      entities: [User, Role, Permission],
      poolSize: 10,
      connectorPackage: 'mysql2',
      extra: {
        authPlugin: 'sha256_password',
      },
    }),
    JwtModule.register({
      global: true,
      secret: 'aaaaaa',
      signOptions: {
        expiresIn: '7d',
      },
    }),
    RedisModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: LoginGuard },
    { provide: APP_GUARD, useClass: PermissionGuard },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(XxxMiddleWare).forRoutes('*');
  }
}
