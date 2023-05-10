import { Body, Controller, Post, UseGuards } from "@nestjs/common";;
import {
    ApiBadRequestResponse,
    ApiBody, ApiNotFoundResponse, ApiOperation,
    ApiTags
} from "@nestjs/swagger";
import {UserService} from './user.service';
import { ValidationError } from "../common/validation-error.dto";
import { NotFoundError } from "../common/not-found-error.dto";
import { UserRegisterRequestDto } from "./dto/user-register.request.dto";
import { UserLoginRequestDto } from "./dto/user-login.request.dto";

@ApiTags('Users')
@Controller('user')
export class UserController {
    constructor(
        private usersService: UserService
    ){}

    @Post('login')
    @ApiBadRequestResponse({ type: ValidationError })
    @ApiOperation({ description: 'API endpoint to login user' })
    @ApiBody({ type: UserLoginRequestDto})
    @ApiNotFoundResponse({ type: NotFoundError})
    async login(@Body() body: UserLoginRequestDto) {
        return this.usersService.login(body);
    }

    @Post('register')
    @ApiBadRequestResponse({ type: ValidationError })
    @ApiOperation({ description: 'API endpoint to create new user' })
    @ApiBody({ type: UserRegisterRequestDto})
    @ApiNotFoundResponse({ type: NotFoundError})
    async register(@Body() body: UserRegisterRequestDto) {
        return this.usersService.register(body)
    }
}
