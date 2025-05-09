import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class CreateChatDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsBoolean()
    isGroup: boolean;
}
