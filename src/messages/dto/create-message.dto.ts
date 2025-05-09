import { IsNotEmpty, IsUUID, IsString } from 'class-validator';

export class CreateMessageDto {
    @IsString()
    @IsNotEmpty()
    content: string;

    @IsUUID()
    chatId: string;

    @IsUUID()
    authorId: string;
}
