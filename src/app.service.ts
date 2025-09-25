import { Injectable,OnModuleInit } from '@nestjs/common';


@Injectable()
export class AppService {
  OnModuleInit(){
    console.log('hello')
  }
  getHello(){
    return 'testing';
  }
}
