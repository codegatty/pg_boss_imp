import { IsString, IsNotEmpty,IsEnum,IsNumber } from 'class-validator';

export class RearrangeData {
  @IsString()
  @IsNotEmpty()
id:string


  @IsString()
  @IsNotEmpty()
    priority:number
}
