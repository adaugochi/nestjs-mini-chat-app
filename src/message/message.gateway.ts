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
import { SendMessageRequestDto } from "./dto/send-message.request.dto";

@WebSocketGateway()
export class MessageGateway implements OnGatewayConnection, OnGatewayDisconnect {
    constructor(private readonly messageService: MessageService) {}

    @WebSocketServer()
    server: Server;

    @SubscribeMessage('sendMessage')
    async handleMessage(
        @MessageBody() message: SendMessageRequestDto
    ) {
        await this.messageService.send(message);
        const newMessage = {
            senderUserId: message.senderUserId,
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
