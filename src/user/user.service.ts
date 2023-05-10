import {Injectable} from '@nestjs/common';
import {DataSource} from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { AuthService } from "../auth/auth.service";
import { UserRegisterRequestDto } from "./dto/user-register.request.dto";
import { UserLoginRequestDto } from "./dto/user-login.request.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectDataSource()
        private dataSource: DataSource,
        private authService: AuthService
    ){}

    public async register(payload: UserRegisterRequestDto) {
        return this.authService.register(payload);
    }

    public async login(payload: UserLoginRequestDto) {
        return this.authService.login(payload);
    }
}
