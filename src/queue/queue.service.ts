import { Injectable,Inject,OnModuleInit } from '@nestjs/common';
import { create } from 'domain';
import PgBoss from 'pg-boss';
import { NewEquipment } from './NewEquipment.dto';

@Injectable()
export class QueueService extends PgBoss implements OnModuleInit{
    private heavyQueue:string = 'HeavyQueue';
    private lightQueue:string = 'LightQueue';
    constructor(){
        super('postgresql://postgres:@localhost:5432/demo')
    }

    async onModuleInit() {
    this.on('error', console.error);
    try{
        await this.start();
        this.newQueue(this.heavyQueue);
        this.newQueue(this.lightQueue);
        
        console.log("Successfully Connected to pg-boss")
        
    }catch(e:any){
        console.error("Unsuccessful to connect to pg-boss")
      console.log(e)
    }
    this.on('error', console.error)
    }

    async insertTask(newEquipment:NewEquipment){
        try{
        const id = await this.send(newEquipment.equipCategory === 'Heavy'?this.heavyQueue:this.lightQueue, newEquipment);
        }catch(e:any){
            console.log(e)
        }
    }

    
    async newQueue(queueName:string){
        
    const isExist=this.getQueue(queueName);
     if(!isExist){
      this.createQueue(queueName);
     }else{
        this.updateQueue(queueName,{name:queueName,policy:'singleton'})
     }
    }

    async getQueueItem(queueName:string){
        try{
        const currentJob =  await this.fetch(queueName,{batchSize:1,includeMetadata:true,ignoreStartAfter:true});
        await this.completeTheInspection(this.heavyQueue,currentJob[0].id)
        return currentJob;
        }catch(e){
            console.log(e)
        }
    }

    async completeTheInspection(queueName:string,id:string){
        await this.complete(queueName,id)
    }

    async processHeavy(){
        await this.work(this.heavyQueue, async ([job]) => {
            console.log(`received job ${job.id} with data ${JSON.stringify(job.data)}`)
        });
    }

        async processLight(){
        await this.work(this.lightQueue, async ([job]) => {
            console.log(`received job ${job.id} with data ${JSON.stringify(job.data)}`)
        });
    }


}
