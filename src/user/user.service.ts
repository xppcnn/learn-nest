import { HttpException, Injectable, Logger } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Permission } from './entities/permission.entity';
import * as crypto from 'crypto';
function md5(str) {
  const hash = crypto.createHash('md5');
  hash.update(str);
  return hash.digest('hex');
}
@Injectable()
export class UserService {
  private logger = new Logger();
  @InjectRepository(User)
  private userRepository: Repository<User>;

  @InjectEntityManager()
  private entityManager: EntityManager;

  async login(user: LoginDto) {
    const foundUser = await this.userRepository.findOneBy({
      username: user.username,
    });
    if (!foundUser) {
      throw new HttpException('用户名不存在', 201);
    }

    if (foundUser.password !== user.password) {
      throw new HttpException('密码错误', 201);
    }
    return foundUser;
  }

  async register(user: RegisterDto) {
    const foundUser = await this.userRepository.findOneBy({
      username: user.username,
    });
    if (foundUser) {
      throw new HttpException('用户名已存在', 201);
    }

    const newUser = new User();
    newUser.username = user.username;
    newUser.password = md5(user.password);
    try {
      await this.userRepository.save(newUser);
      return '注册成功';
    } catch (error) {
      this.logger.error(error, UserService);
      return '注册失败';
    }
  }

  async initPremission() {
    const permission1 = new Permission();
    permission1.name = 'create_aaa';
    permission1.desc = '新增 aaa';

    const permission2 = new Permission();
    permission2.name = 'update_aaa';
    permission2.desc = '修改 aaa';

    const permission3 = new Permission();
    permission3.name = 'remove_aaa';
    permission3.desc = '删除 aaa';

    const permission4 = new Permission();
    permission4.name = 'query_aaa';
    permission4.desc = '查询 aaa';

    const permission5 = new Permission();
    permission5.name = 'create_bbb';
    permission5.desc = '新增 bbb';

    const permission6 = new Permission();
    permission6.name = 'update_bbb';
    permission6.desc = '修改 bbb';

    const permission7 = new Permission();
    permission7.name = 'remove_bbb';
    permission7.desc = '删除 bbb';

    const permission8 = new Permission();
    permission8.name = 'query_bbb';
    permission8.desc = '查询 bbb';

    const user1 = new User();
    user1.username = '东东';
    user1.password = 'aaaaaa';
    user1.permissions = [permission1, permission2, permission3, permission4];

    const user2 = new User();
    user2.username = '光光';
    user2.password = 'bbbbbb';
    user2.permissions = [permission5, permission6, permission7, permission8];

    await this.entityManager.save([
      permission1,
      permission2,
      permission3,
      permission4,
      permission5,
      permission6,
      permission7,
      permission8,
    ]);
    await this.entityManager.save([user1, user2]);
  }

  async findByUserName(name: string) {
    const user = await this.entityManager.findOne(User, {
      where: {
        username: name,
      },
      relations: {
        permissions: true,
      },
    });
    return user;
  }
}
