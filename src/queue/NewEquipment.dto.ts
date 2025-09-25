import { IsString, IsNotEmpty,IsEnum } from 'class-validator';

export class NewEquipment {
  @IsString()
  @IsNotEmpty()
  equipmentId: string; // UK

  @IsString()
  @IsNotEmpty()
  technicalId?: string;

  @IsString()
  assetId: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsEnum(['Heavy','Light'])
  equipCategory:'Heavy'|'Light' ;

  @IsString()
  description: string;
}
