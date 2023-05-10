import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'messages' })
export class MessageEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column({ type: 'int', name: 'sender_user_id' })
    senderUserId: number;

    @Column({ type: 'int', name: 'receiver_user_id' })
    receiverUserId: number;

    @Column({ type: 'varchar', name: 'message_body' })
    messageBody: string;

    @CreateDateColumn({
        name: 'timestamp',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    timestamp: Date;
}