import { Injectable,OnModuleInit } from '@nestjs/common';
import PgBoss from 'pg-boss';
import {Client} from 'pg';
import { NewEquipment } from './NewEquipment.dto';
import { error } from 'console';
import { RearrangeData } from './RearrangeData.dto';

@Injectable()
export class QueueService extends PgBoss implements OnModuleInit{
    private heavyQueue:string = 'HeavyQueue';
    private lightQueue:string = 'LightQueue';

    private client:Client
    constructor(){
        super('postgresql://postgres:@localhost:5432/demo')
    }


    async onModuleInit() {

        try{
                        this.client = new Client({
      host: 'localhost',   // or your db host
      port: 5432,          // default port
      user: 'postgres',    // your db username
      password: '',// your db password
      database: 'demo',    // your db name
            });
        //db
        console.log("Db connected successfully!")
        await this.client.connect();
        }catch(e){
            console.log("Db couldn't connect !")
            console.log(e)
        }
    this.on('error', console.error);
    try{
        await this.start();
        const installed = await this.isInstalled() //check for the configuration in postgresql
        
        if(!installed){
            throw error('Pg-boss not been configured in database level')
        }
        this.newQueue(this.heavyQueue);
        this.newQueue(this.lightQueue);
        
        console.log("Successfully Connected to pg-boss")
        
    }catch(e:any){
        console.error("Unsuccessful to connect to pg-boss")
      console.log(e)
    }
    this.on('error', console.error)
    }

    async insertTask(newEquipment:NewEquipment,priority?:number){
        try{
        const id = await this.send(newEquipment.equipCategory === 'Heavy'?this.heavyQueue:this.lightQueue, newEquipment,{priority:priority??0});
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

    async getQueueData(queueName:string){
        const result = await this.client.query(`select id,name,priority,data,state from pgboss.job where name = '${queueName}'; `)
        return result;
    }

        async sortQueueData(queueName:string){
        const result = await this.client.query(`select id,name,priority,data,state from pgboss.job where name = '${queueName}' and state = 'created' sort by data.equipmentId ; `)
        return result;
    }

    async rearrangeQueueData(queueName:string,rearrangedData:Array<RearrangeData>){
        console.log(queueName)
        try{
        for( const item of rearrangedData){
            await this.cancel(queueName,item.id)
            const currentJob:PgBoss.JobWithMetadata<NewEquipment> | null = await this.getJobById(queueName,item.id)
            if(currentJob?.data){
           await this.insertTask(currentJob.data,item.priority)
            await this.deleteJob(queueName,currentJob.id)    
            }
        }
        return 'rearrange success'
    }catch(e:any){
        console.log(e)
    }
    }



}
