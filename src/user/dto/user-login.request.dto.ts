import { IsEmail, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UserLoginRequestDto {
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({ required: true, example: 'abc@example.com', description: 'User email' })
    email: string;

    @IsNotEmpty()
    @ApiProperty({ required: true, example: '11111111', description: 'User password' })
    password: string;
}