import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiBody, ApiNotFoundResponse,
    ApiOperation,
    ApiTags,
    ApiUnauthorizedResponse
} from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { User, UserDecorator } from "../user/user.decorator";
import { ValidationError } from "../common/validation-error.dto";
import { UnauthorizedError } from "../common/unauthorized-error.dto";
import { NotFoundError } from "../common/not-found-error.dto";
import { MessageGateway } from "./message.gateway";
import { SendMessageRequestDto } from "./dto/send-message.request.dto";

@ApiTags('Message')
@Controller('message')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class MessageController {

    constructor(
        private readonly messageGateway: MessageGateway,
    ){}

    @Post('send')
    @ApiBadRequestResponse({ type: ValidationError })
    @ApiOperation({ description: 'API endpoint to send message' })
    @ApiBody({ type: SendMessageRequestDto})
    @ApiUnauthorizedResponse({ type: UnauthorizedError})
    @ApiNotFoundResponse({ type: NotFoundError})
    async sendMessage(@Body() body: SendMessageRequestDto, @User() user: UserDecorator) {
        await this.messageGateway.handleMessage(body, user);
        return true;
    }
}
