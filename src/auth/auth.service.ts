import {Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {AppConstants} from '../constants';
import * as bcrypt from 'bcrypt';
import { DataSource } from "typeorm";
import {UserEntity, UserStatusEnum} from "../user/user.entity";
import {CustomError} from "../common/custom.error";
import { UserRegisterRequestDto } from "../user/dto/user-register.request.dto";
import { UserLoginRequestDto } from "../user/dto/user-login.request.dto";

@Injectable()
export class AuthService {
    constructor(
        private readonly dataSource: DataSource,
        private jwtService: JwtService
    ) {}

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await UserEntity.findOne({ where: {email: email}});

        if (user && await bcrypt.compare(pass, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    public async login(body: UserLoginRequestDto) {
        const user = await this.validateUser(body.email, body.password);
        if (!user) {
            throw new UnauthorizedException();
        }

        if(user?.active == UserStatusEnum.YES) {
            let payload = {
                id: user.id,
                name: user.name,
                email: user.email
            };

            return {
                code: 200,
                access_token: this.jwtService.sign(payload),
                user: payload,
            };
        } else {
            throw new CustomError(AppConstants.Messages.INVALID_USER)
        }
    }

    public async register(payload: UserRegisterRequestDto)
    {
        try {
            let existing = await UserEntity.findOne({
                where: { email: payload.email }
            });
            if (existing) {
                throw new Error('User already exit');
            } else {
                const hash = await bcrypt.hash(payload.password, AppConstants.SaltOrRounds);

                await this.dataSource.createQueryBuilder()
                    .insert()
                    .into("users")
                    .values([{
                        email: payload.email,
                        password: hash,
                        name: payload.name
                    }])
                    .execute();

                return { success: true, message: 'Success'}
            }
        } catch (e) {
            return {
                success: false,
                message: e.message
            }
        }
    }
}
