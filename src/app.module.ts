import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AaaModule } from './aaa/aaa.module';
import { XxxModule } from './xxx/xxx.module';
import { YyyModule } from './yyy/yyy.module';
import { ZzzModule } from './zzz/zzz.module';
import { FilesUploadModule } from './files-upload/files-upload.module';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { RedisModule } from './redis/redis.module';
// import { APP_GUARD } from '@nestjs/core';
// import { LoginGuard } from './login.guard';
// import { PermissionGuard } from './user/permission.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    JwtModule.registerAsync({
      global: true,
      useFactory(configService: ConfigService) {
        return {
          secret: configService.get('jwt_secret'),
          signOptions: {
            expiresIn: configService.get('jwt_expires'),
          },
        };
      },
      inject: [ConfigService],
    }),
    RedisModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // { provide: APP_GUARD, useClass: LoginGuard },
    // { provide: APP_GUARD, useClass: PermissionGuard },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(XxxMiddleWare).forRoutes('*');
  }
}
