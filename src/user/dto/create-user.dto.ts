import { IsEmail,IsEnum, IsNotEmpty, IsString } from "class-validator";
export class CreateUserDto{
    @IsNotEmpty()
    @IsString()
    name:string;
    @IsEmail()
    email:string;
    @IsEnum(['Admin','Manager','User'])
    role:'Admin'|'Manager'|'User';
}