import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto} from './dto/update-user.dto';

@Controller('user')
export class UserController {

    constructor(private readonly userService:UserService){};

    @Get()
    findAll(@Query('role') role?:'User'|'Admin'|'Manager'){
        return this.userService.findAll(role);
    }

    @Get(':id')
    findOne(@Param('id',ParseIntPipe) id:number){
        return this.userService.findOne(id);
    }

    @Post()
    create(@Body() createUserDto :CreateUserDto){
        return this.userService.create(createUserDto)
    }

    @Patch(':id')
    update(@Param('id',ParseIntPipe) id:number, @Body() updateUserDto:UpdateUserDto){
        return this.userService.update(id,updateUserDto)
    }

    @Delete(':id')
    delete(@Param('id',ParseIntPipe) id:number){
        return this.userService.delete(id)
    }


    
}
