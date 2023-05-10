import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { SendMessageRequestDto } from "./dto/send-message.request.dto";

@Injectable()
export class MessageService {
    constructor(
        @InjectDataSource()
        private dataSource: DataSource
    ){
    }

    public async send(payload: SendMessageRequestDto)
    {
        await this.dataSource.createQueryBuilder()
            .insert()
            .into("messages")
            .values([payload])
            .execute();
        return true;
    }
}