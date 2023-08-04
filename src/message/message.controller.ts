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
import { SendMessageRequestDto } from "./dto/send-message.request.dto";
import { MessageService } from "./message.service";

@ApiTags('Message')
@Controller('message')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class MessageController {

    constructor(
        private readonly messageService: MessageService
    ){}

    @Post('send')
    @ApiBadRequestResponse({ type: ValidationError })
    @ApiOperation({ description: 'API endpoint to send message' })
    @ApiBody({ type: SendMessageRequestDto})
    @ApiUnauthorizedResponse({ type: UnauthorizedError})
    @ApiNotFoundResponse({ type: NotFoundError})
    async sendMessage(@Body() body: SendMessageRequestDto, @User() user: UserDecorator) {
        body.senderUserId = user.id;
        await this.messageService.send(body);
        return true;
    }
}
