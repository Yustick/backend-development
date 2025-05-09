import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    UseGuards,
    Put,
    Req,
} from '@nestjs/common';
import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { RoleGuard } from 'src/authentication/guards/role.guard';
import { Role } from 'src/roles/role.enum';
import JwtAuthenticationGuard from 'src/authentication/jwt-authentication.guard';
import { RequestWithUser } from 'src/authentication/request-with-user.interface';
import { ChatOwnerGuard } from 'src/authentication/guards/chat-owner.guard';

@Controller('api/v1/chats')
@UseGuards(JwtAuthenticationGuard)
export class ChatsController {
    constructor(private readonly chatsService: ChatsService) {}

    @Post()
    create(@Body() createChatDto: CreateChatDto,@Req() req: RequestWithUser) {
        const userIds: string[] = createChatDto.withUserIds;
        userIds.push(req.user.id);
        delete createChatDto.withUserIds;
        
        return this.chatsService.create(createChatDto, userIds);
    }

    @Get()
    findAll() {
        return this.chatsService.findAll();
    }

    @Get(':id')
    @UseGuards(ChatOwnerGuard)
    findOne(@Param('id') id: string) {
        return this.chatsService.findOne(id);
    }

    @Put(':id')
    @UseGuards(ChatOwnerGuard)
    update(@Param('id') id: string, @Body() updateChatDto: UpdateChatDto) {
        return this.chatsService.update(id, updateChatDto);
    }

    @Delete(':id')
    @UseGuards(ChatOwnerGuard)
    @UseGuards(RoleGuard([Role.ADMIN]))
    remove(@Param('id') id: string) {
        return this.chatsService.remove(id);
    }
}
