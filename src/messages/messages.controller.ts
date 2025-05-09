import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Req,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { UpdateMessageDto } from './dto/update-message.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import JwtAuthenticationGuard from 'src/authentication/guards/jwt-authentication.guard';
import { MessageOwnerGuard } from 'src/authentication/guards/message-owner.guard';
import { RequestWithUser } from 'src/authentication/request-with-user.interface';

@Controller('api/v1/messages')
@UseGuards(JwtAuthenticationGuard)
export class MessagesController {
    constructor(private readonly messagesService: MessagesService) {}

    @Post()
    create(@Body() createMessageDto: CreateMessageDto, @Req() req: RequestWithUser) {
        return this.messagesService.create(createMessageDto, req.user.id);
    }

    @Get()
    findAll(@Req() req: RequestWithUser) {
        const userRoles = req.user.roles.map((role) => role.role.name);
        return this.messagesService.findAllForUserOrAdmin(req.user.id, userRoles);
    }

    @Get(':id')
    @UseGuards(MessageOwnerGuard)
    findOne(@Param('id') id: string) {
        return this.messagesService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(MessageOwnerGuard)
    update(
        @Param('id') id: string,
        @Body() updateMessageDto: UpdateMessageDto
    ) {
        return this.messagesService.update(id, updateMessageDto);
    }

    @Delete(':id')
    @UseGuards(MessageOwnerGuard)
    remove(@Param('id') id: string) {
        return this.messagesService.remove(id);
    }
}
