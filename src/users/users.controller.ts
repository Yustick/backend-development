import {
    Controller,
    Get,
    Body,
    Param,
    Delete,
    Put,
    ParseUUIDPipe,
    UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from 'src/roles/role.enum';
import { RoleGuard } from 'src/authentication/guards/role.guard';
import JwtAuthenticationGuard from 'src/authentication/guards/jwt-authentication.guard';

@Controller('api/v1/users')
@UseGuards(JwtAuthenticationGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    // @Post()
    // @HttpCode(HttpStatus.OK)
    // create(@Body() data: CreateUserDto) {
    //     return this.usersService.create(data);
    // }

    @Get()
    @UseGuards(RoleGuard([Role.ADMIN]))
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    @UseGuards(RoleGuard([Role.ADMIN]))
    findOne(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.usersService.findOne(id);
    }

    @Put(':id')
    @UseGuards(RoleGuard([Role.ADMIN]))
    update(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() data: UpdateUserDto
    ) {
        return this.usersService.update(id, data);
    }

    @Put(':id/assign/:role')
    @UseGuards(RoleGuard([Role.ADMIN]))
    async assignRole(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Param('role') role: string
    ) {
        return this.usersService.assignRole(id, role);
    }

    @Delete(':id')
    @UseGuards(RoleGuard([Role.ADMIN]))
    remove(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.usersService.remove(id);
    }
}
