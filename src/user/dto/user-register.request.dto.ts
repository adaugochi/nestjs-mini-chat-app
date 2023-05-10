import { IsEmail, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UserRegisterRequestDto {
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({ required: true, example: 'samdave@example.com', description: 'Employee email' })
    email: string;

    @IsNotEmpty()
    @ApiProperty({ required: true, example: '11111111', description: 'User password' })
    password: string;

    @IsNotEmpty()
    @ApiProperty({ required: true, example: 'Sam Dave', description: 'User name' })
    name: string;
}