import { IsOptional, IsString, IsBoolean, IsArray, ArrayMinSize, IsUUID } from 'class-validator';

export class CreateChatDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsBoolean()
    isGroup: boolean;

    @IsArray()
    @ArrayMinSize(1, { message: 'Chat must include at least two users.' })
    @IsUUID('all', { each: true })
    withUserIds: string[];
}
