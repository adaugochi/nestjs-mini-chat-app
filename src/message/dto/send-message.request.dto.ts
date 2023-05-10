import { IsNotEmpty, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SendMessageRequestDto {
    @IsNotEmpty()
    @ApiProperty({ required: true, example: 3, description: 'receiver ID' })
    receiverUserId: number;

    @IsNotEmpty()
    @ApiProperty({ required: true, example: 'hello world', description: 'message body' })
    messageBody: string;

    @IsOptional()
    @ApiProperty({ required: false, example: 1, description: 'sender ID' })
    senderUserId: number
}