import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleGuard } from 'src/authentication/guards/role.guard';
import JwtAuthenticationGuard from 'src/authentication/guards/jwt-authentication.guard';
import { Role } from './role.enum';

@Controller('api/v1/roles')
@UseGuards(JwtAuthenticationGuard)
export class RolesController {
    constructor(private readonly rolesService: RolesService) {}

    @Post()
    @UseGuards(RoleGuard([Role.ADMIN]))
    create(@Body() createRoleDto: CreateRoleDto) {
        return this.rolesService.create(createRoleDto);
    }

    @Get()
    @UseGuards(RoleGuard([Role.ADMIN]))
    findAll() {
        return this.rolesService.findAll();
    }

    @Get(':id')
    @UseGuards(RoleGuard([Role.ADMIN]))
    findOne(@Param('id') id: string) {
        return this.rolesService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(RoleGuard([Role.ADMIN]))
    update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
        return this.rolesService.update(id, updateRoleDto);
    }

    @Delete(':id')
    @UseGuards(RoleGuard([Role.ADMIN]))
    remove(@Param('id') id: string) {
        return this.rolesService.remove(id);
    }
}
