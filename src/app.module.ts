import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { QueueModule } from './queue/queue.module';
import PgBoss from 'pg-boss';

@Module({
  imports: [UserModule, QueueModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule{
  // pgBoss: PgBoss;

  // constructor() {
  //   this.pgBoss = new PgBoss('postgresql://postgres:@localhost:5432/demo');
  // }

  // async onModuleInit() {
  //   console.log("Connection Started");
  //   this.pgBoss.on('error', console.error);
  //   try{
  //   await this.pgBoss.start();
  //   const queue = 'task-queue';
  //   await this.pgBoss.createQueue(queue);
  //   const id = await this.pgBoss.send(queue, { arg1: 'read me' })
  //     console.log(id)
  //   }catch(e:any){
  //     console.log(e)
  //   }
  // }


}
