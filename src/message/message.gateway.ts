import { Server, Socket } from "socket.io";
import { MessageService } from './message.service';
import {
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from "@nestjs/websockets";
import { User, UserDecorator } from "../user/user.decorator";
import { SendMessageRequestDto } from "./dto/send-message.request.dto";

@WebSocketGateway()
export class MessageGateway implements OnGatewayConnection, OnGatewayDisconnect {
    constructor(private readonly messageService: MessageService) {}

    @WebSocketServer()
    server: Server;

    @SubscribeMessage('sendMessage')
    async handleMessage(
        @MessageBody() message: SendMessageRequestDto,
        @User() user: UserDecorator
    ) {
        await this.messageService.send(message, user.id);
        const newMessage = {
            senderUserId: user.id,
            messageBody: message.messageBody
        }
        this.server.emit('receiveMessage', newMessage);
    }

    handleConnection(socket: Socket) {
        console.log(`Socket Connected: ${socket.id}`);
    }

    handleDisconnect(socket: Socket) {
        console.log(`Socket Disconnected: ${socket.id}`);
    }
}
