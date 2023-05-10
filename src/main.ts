import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import {useContainer} from "class-validator";
import {ValidationPipe} from "@nestjs/common";
import { MessageModule } from "./message/message.module";
import { WsAdapter } from '@nestjs/platform-ws';
import { config } from 'dotenv';

async function bootstrap() {
    config();

    const app = await NestFactory.create(AppModule);
    // Use the WebSocket adapter
    app.useWebSocketAdapter(new WsAdapter(app));
    app.useGlobalPipes(new ValidationPipe({
        forbidUnknownValues: false,
        validationError: {
            target: false,
            value: false,
        },
        transform: false
    }));
    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    app.enableCors();

    const configSetting = new DocumentBuilder()
        .addBearerAuth()
        .setTitle('Chat App APIs')
        .setDescription('Nest.js Chat App API')
        .setVersion('1.0')
        .addTag('chat-app')
        .build();
    const document = SwaggerModule.createDocument(
        app,
        configSetting,
        {
            include: [
                AuthModule,
                UserModule,
                MessageModule
            ]
        });
    SwaggerModule.setup('api-chat-app', app, document);
    await app.listen(3000);
}
bootstrap();
